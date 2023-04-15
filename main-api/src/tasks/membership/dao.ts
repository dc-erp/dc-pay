import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        employeeId,
        transactionId
    } = newMenu
    const query = `
	INSERT INTO 
        membership 
        (
            id,
            employee_id,
            transaction_id
            ) 
    VALUES ($1, $2, $3)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        employeeId,
        transactionId
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: memberships } = await pool.query(`
    SELECT 
    ms.id,
    ms.employee_id,
    ms.transaction_id,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    td.transaction_name,
    td.transaction_code
    FROM membership ms
    INNER JOIN employee e1 ON ms.employee_id = e1.id
    INNER JOIN transaction_definition td ON ms.transaction_id = td.id
    WHERE e1.organization_id=$1`,
        [organizationId])
    return memberships
}



export const deleteMembership = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM membership WHERE id=$1', [branchId])
}


export const updateMembership = async (updatedMembership: any): Promise<string> => {
    const {
        id,
        employeeId,
        transactionId
    } = updatedMembership
    const query = `
    UPDATE membership
    SET employee_id = $1,
    transaction_id = $2
    WHERE id = $3
    RETURNING *;
    `
    const res = await pool.query(query, [
        employeeId,
        transactionId,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteMembership,
    getAllFromOrganization,
    updateMembership
}