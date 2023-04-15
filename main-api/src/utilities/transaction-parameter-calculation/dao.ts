import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    } = newMenu
    const query = `
	INSERT INTO 
        transaction_calculation 
        (
            id,
            first_transaction_id,
            second_transaction_id,
            third_transaction_id,
            calculation_unit,
            first_option,
            second_option,
            rate
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: transactionParameterCalculations } = await pool.query(`
    SELECT 
    tc.id,
    tc.first_transaction_id,
    tc.second_transaction_id,
    tc.third_transaction_id,
    tc.calculation_unit,
    tc.first_option,
    tc.second_option,
    tc.rate,
    td1.transaction_name as first_transaction_name,
    td1.transaction_code as first_transaction_code,
    td2.transaction_name as second_transaction_name,
    td2.transaction_code as second_transaction_code,
    td3.transaction_name as third_transaction_name,
    td3.transaction_code as third_transaction_code
    FROM transaction_calculation tc
    INNER JOIN transaction_definition td1 ON tc.first_transaction_id = td1.id
    INNER JOIN transaction_definition td2 ON tc.first_transaction_id = td2.id
    INNER JOIN transaction_definition td3 ON tc.first_transaction_id = td3.id
    WHERE td1.organization_id=$1`,
        [organizationId])
    return transactionParameterCalculations
}



export const deleteTransactionParameterCalculation = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM transaction_calculation WHERE id=$1', [branchId])
}


export const updateTransactionParameterCalculation = async (updatedTransactionParameterCalculation: any): Promise<string> => {
    const {
        id,
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate
    } = updatedTransactionParameterCalculation
    const query = `
    UPDATE 
    transaction_calculation
    SET 
    first_transaction_id = $1,
    second_transaction_id = $2,
    third_transaction_id = $3,
    calculation_unit = $4,
    first_option = $5,
    second_option = $6,
    rate = $7
    WHERE id = $8
    RETURNING *;
    `
    const res = await pool.query(query, [
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteTransactionParameterCalculation,
    getAllFromOrganization,
    updateTransactionParameterCalculation
}