import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount
    } = newMenu
    const query = `
	INSERT INTO 
        loan_transaction 
        (
            id,
            employee_id,
            transaction_id,
            total_loan,
            transaction_amount,
            remaining_balance
            ) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount,
       totalLoan
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: loanTransactions } = await pool.query(`
    SELECT 
    lt.id,
    lt.employee_id,
    lt.transaction_id,
    lt.total_loan,
    lt.transaction_amount,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    td.transaction_name,
    td.transaction_code,
    lt.remaining_balance
    FROM loan_transaction lt
    INNER JOIN employee e1 ON lt.employee_id = e1.id
    INNER JOIN transaction_definition td ON lt.transaction_id = td.id
    WHERE e1.organization_id=$1`,
        [organizationId])
    return loanTransactions
}



export const deleteLoanTransaction = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM loan_transaction WHERE id=$1', [branchId])
}


export const updateLoanTransaction = async (updatedLoanTransaction: any): Promise<string> => {
    const {
        id,
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount
    } = updatedLoanTransaction
    const query = `
    UPDATE loan_transaction
    SET employee_id = $1,
    transaction_id = $2,
    total_loan = $3,
    transaction_amount = $4 
    WHERE id = $5
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeId,
        transactionId,
        totalLoan,
        transactionAmount,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteLoanTransaction,
    getAllFromOrganization,
    updateLoanTransaction
}