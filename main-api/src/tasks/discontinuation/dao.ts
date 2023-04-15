import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        referenceNumber,
        employeeId,
        actionType,
        discontinuationDate
    } = newMenu
    const query = `
	INSERT INTO 
        discontinuation 
        (
            id,
            reference_number,
            employee_id,
            action_type,
            discontinuation_date 
            ) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        referenceNumber,
        employeeId,
        actionType,
        new Date(discontinuationDate),
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: discontinuations } = await pool.query(`
    SELECT 
    dn.id,
    dn.employee_id,
    dn.action_type,
    dn.reference_number,
    dn.discontinuation_date,
    e1.employee_code,
    e1.first_name as employee_first_name,
    e1.last_name as employee_last_name,
    pd.parameter_name as action_type_name
    FROM discontinuation dn
    INNER JOIN employee e1 ON dn.employee_id = e1.id
    INNER JOIN parameter_definition pd ON dn.action_type = pd.id
    WHERE e1.organization_id=$1`,
        [organizationId])
    return discontinuations
}



export const deleteDiscontinuation = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM discontinuation WHERE id=$1', [branchId])
}


export const updateDiscontinuation = async (updatedDiscontinuation: any): Promise<string> => {
    const {
        id,
        referenceNumber,
        employeeId,
        actionType,
        discontinuationDate
    } = updatedDiscontinuation
    const query = `
    UPDATE discontinuation
    SET reference_number = $1,
    employee_id = $2,
    action_type = $3,
    discontinuation_date = $4 
    WHERE id = $5
    RETURNING *;
    `
    const res = await pool.query(query, [
        referenceNumber,
        employeeId,
        actionType,
        new Date(discontinuationDate),
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteDiscontinuation,
    getAllFromOrganization,
    updateDiscontinuation
}