import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'



export const create = async (newTransactionDefinition: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchId,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount

    } = newTransactionDefinition
    const query = `
	INSERT INTO 
        transaction_definition 
        (
            id,
            organization_id,
            branch_id,
            transaction_code,
            transaction_name,
            short_name,
            transaction_type,
            update_type,
            permanent,
            taxable,
            un_taxable_limit,
            affect_by_leave,
            leave_days,
            affect_back_payroll,
            affect_beneficiary,
            transaction_group,
            gl_entry_by,
            direct_account,
            contract_gl_account
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchId,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent || false,
        taxable || false,
        unTaxableLimit,
        affectByLeave || false,
        leaveDays,
        affectBackPayroll || false,
        affectBeneficiary || false,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string) => {
    const { rows: employees } = await pool.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.organization_id=$1`,
        [organizationId])
    return employees
}


export const getByName = async (transactionName: string) => {
    const { rows: employees } = await pool.query(`
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.branch_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name,
    transaction_definition.short_name,
    transaction_definition.transaction_type,
    transaction_definition.update_type,
    transaction_definition.permanent,
    transaction_definition.taxable,
    transaction_definition.un_taxable_limit,
    transaction_definition.affect_by_leave,
    transaction_definition.leave_days,
    transaction_definition.affect_back_payroll,
    transaction_definition.affect_beneficiary,
    transaction_definition.transaction_group,
    transaction_definition.gl_entry_by,
    transaction_definition.direct_account,
    transaction_definition.contract_gl_account,
    pd1.parameter_name as transaction_type_name,
    pd2.parameter_name as transaction_group_name,
    pd3.parameter_name as update_type_name
    FROM transaction_definition
    INNER JOIN parameter_definition pd1 ON transaction_definition.transaction_type = pd1.id
    INNER JOIN parameter_definition pd2 ON transaction_definition.transaction_group = pd2.id
    INNER JOIN parameter_definition pd3 ON transaction_definition.update_type = pd3.id
    WHERE transaction_definition.transaction_name=$1`,
        [transactionName])
    return employees[0]
}


export const deleteTransactionDefinition = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM transaction_definition WHERE id=$1', [branchId])
}


export const updateTransactionDefinition = async (updatedTransactionDefinition: any): Promise<string> => {
    const {
        id,
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount
    } = updatedTransactionDefinition
    const query = `
    UPDATE transaction_definition
    SET 
    transaction_code = $1,
    transaction_name = $2,
    short_name = $3,
    transaction_type = $4,
    update_type = $5,
    permanent = $6,
    taxable = $7,
    un_taxable_limit = $8,
    affect_by_leave = $9,
    leave_days = $10,
    affect_back_payroll = $11,
    affect_beneficiary = $12,
    transaction_group = $13,
    gl_entry_by = $14,
    direct_account = $15,
    contract_gl_account = $16
    WHERE id = $17
    RETURNING *;
    `
    const res = await pool.query(query, [
        transactionCode,
        transactionName,
        shortName,
        transactionType,
        updateType,
        permanent,
        taxable,
        unTaxableLimit,
        affectByLeave,
        leaveDays,
        affectBackPayroll,
        affectBeneficiary,
        transactionGroup,
        glEntryBy,
        directAccount,
        contractGLAccount,
        id])
    return res.rows[0]
}


export const getAllFromTransactionGroup = async (organizationId: string, transactionParameterName: string,transactionGroupId: any) => {
    const tranQuery = `
    SELECT 
    transaction_definition.id,
    transaction_definition.organization_id,
    transaction_definition.transaction_code,
    transaction_definition.transaction_name
    FROM transaction_definition
    WHERE 
    transaction_definition.organization_id=$1 AND 
    ${transactionParameterName === 'Transaction Group' ? "transaction_definition.transaction_group=$2" : 
     transactionParameterName === 'Transaction Update Type' ? "transaction_definition.update_type=$2" : ""
}
   `
    const { rows: transactions } = await pool.query(tranQuery,
        [organizationId, transactionGroupId])
    return transactions
}



export default {
    create,
    deleteTransactionDefinition,
    getAllFromOrganization,
    getByName,
    getAllFromTransactionGroup,
    updateTransactionDefinition
}