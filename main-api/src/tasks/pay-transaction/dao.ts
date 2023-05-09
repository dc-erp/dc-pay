import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        transactionId,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        pay_transaction 
        (
            id,
            employee_id,
            transaction_id,
            transaction_amount 
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId,
        transactionAmount
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: payTransactions } = await pool.query(`
    SELECT 
    lt.id,
    lt.employee_id,
    lt.transaction_id,
    lt.transaction_amount,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    td.transaction_name,
    td.transaction_code,
    pd.parameter_name as transaction_type_name
    FROM pay_transaction lt
    INNER JOIN employee e1 ON lt.employee_id = e1.id
    INNER JOIN transaction_definition td ON lt.transaction_id = td.id
    INNER JOIN parameter_definition pd ON pd.id = td.transaction_type
    WHERE e1.organization_id=$1`,
        [organizationId])
        await getPayrollSheet(organizationId)
    return payTransactions
}



const getPayrollSheet = async(organizationId: string) => {
    const { rows: employees } = await pool.query(`
    SELECT 
    id, 
    employee_code,
    first_name,
    last_name
    FROM employee e1
    WHERE e1.organization_id=$1`,
        [organizationId])

    const employeeTransactions = await Promise.all(employees.map(async (employee: any) => {
    

    const { rows: payTransactions } = await pool.query(`
        SELECT 
        pt.transaction_id,
        pt.transaction_amount,
        td.transaction_name,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM pay_transaction pt
        INNER JOIN transaction_definition td ON pt.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE pt.employee_id=$1`,
        [employee.id])

        const { rows: loanTransactions } = await pool.query(`
        SELECT 
        lt.transaction_id,
        lt.transaction_amount,
        td.transaction_name,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM loan_transaction lt
        INNER JOIN transaction_definition td ON lt.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE lt.employee_id=$1`,
        [employee.id])


        const { rows: memberships } = await pool.query(`
        SELECT 
        ms.transaction_id,
        td.transaction_name,
        pd1.parameter_name as transaction_type_name,
        pd2.parameter_name as update_type_name
        FROM membership ms
        INNER JOIN transaction_definition td ON ms.transaction_id = td.id
        INNER JOIN parameter_definition pd1 ON pd1.id = td.transaction_type
        INNER JOIN parameter_definition pd2 ON pd2.id = td.update_type
        WHERE ms.employee_id=$1`,
        [employee.id])


        const tranC: any[] = []
        const allTransactions = [...payTransactions, ...loanTransactions]

        await Promise.all([...memberships, ...payTransactions].map(async (payTransaction) => {
            const { rows: tranCal } = await pool.query(`
                SELECT 
                td1.transaction_name as first_transaction_name,
                td2.transaction_name as second_transaction_name,
                pd1.parameter_name as calculation_unit_name,
                pd2.parameter_name as first_option_value,
                pd3.parameter_name as second_option_value,
                pt1.transaction_amount as second_transaction_value,
                pt2.transaction_amount as third_transaction_value,
                pd4.parameter_name as transaction_type_name,
                pd5.parameter_name as update_type_name,
                e1.monthly_working_hours,
                e1.working_days,
                tc.rate
                FROM transaction_calculation tc
                INNER JOIN parameter_definition pd1 ON pd1.id = tc.calculation_unit
                INNER JOIN parameter_definition pd2 ON pd2.id = tc.first_option
                INNER JOIN parameter_definition pd3 ON pd3.id = tc.second_option
                INNER JOIN transaction_definition td1 ON td1.id = tc.first_transaction_id
                INNER JOIN parameter_definition pd4 ON pd4.id = td1.transaction_type
                INNER JOIN parameter_definition pd5 ON pd5.id = td1.update_type
                INNER JOIN transaction_definition td2 ON td2.id = tc.second_transaction_id
                INNER JOIN pay_transaction pt1 ON pt1.transaction_id = tc.second_transaction_id
                LEFT JOIN pay_transaction pt2 ON pt2.transaction_id = tc.third_transaction_id 
                INNER JOIN employee e1 ON e1.id = pt1.employee_id
                WHERE tc.third_transaction_id = $1 OR tc.first_transaction_id = $1 
                `,
                [payTransaction.transaction_id])  
                tranC.push(...tranCal)
            }))
        
            if(tranC.length > 0) {
                const calculatedTrans = tranC.map((calc) => calculateTransactionCalculations(calc))
                allTransactions.push(...calculatedTrans)
            }  


            const netPay = calculateNetPay(allTransactions)
        return {
            employeeName: `${employee.first_name} ${employee.last_name}`,
            employeeCode: `${employee.employee_code}`,
            transactions: [...payTransactions, ...allTransactions],
            netPay
        }

    }))

    console.log(employeeTransactions)

}


const calculateTransactionCalculations = (transaction: any) => {
    let transaction_amount: any
    if(transaction.calculation_unit_name === 'Monthly')
        transaction_amount = parseFloat(transaction.second_transaction_value)
    if(transaction.calculation_unit_name === 'Hourly')
        transaction_amount = parseFloat(transaction.second_transaction_value)/parseFloat(transaction.monthly_working_hours)
     if(transaction.calculation_unit_name === 'Daily')
        transaction_amount = parseFloat(transaction.second_transaction_value)/parseFloat(transaction.working_days)
    if(transaction.first_option_value === '*')
        transaction_amount *= parseFloat(transaction.third_transaction_value)
    if(transaction.second_option_value === '*')
        transaction_amount *= parseFloat(transaction.rate)
    if(transaction.first_option_value === '=' && transaction.second_option_value === '=')
        transaction_amount = parseFloat(transaction.rate)
    return {
        transaction_name: transaction.first_transaction_name,
        transaction_amount,
        transaction_type_name: transaction.transaction_type_name,
        update_type_name: transaction.update_type_name

    }
}

const calculateNetPay = (transactions: any) => {
    let netPay = 0 
    transactions.map((tran: any) => {
        if(tran.transaction_type_name === 'Earning Amount')
            netPay += parseFloat(tran.transaction_amount)
        if(tran.transaction_type_name === 'Deduction Amount')
            netPay -= parseFloat(tran.transaction_amount)
    })
    return netPay
}


export const deletePayTransaction = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM pay_transaction WHERE id=$1', [branchId])
}


export const updatePayTransaction = async (updatedPayTransaction: any): Promise<string> => {
    const {
        id,
        employeeId,
        transactionId,
        transactionAmount
    } = updatedPayTransaction
    const query = `
    UPDATE pay_transaction
    SET employee_id = $1,
    transaction_id = $2,
    transaction_amount = $3 
    WHERE id = $4
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeId,
        transactionId,
        transactionAmount,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deletePayTransaction,
    getAllFromOrganization,
    updatePayTransaction
}