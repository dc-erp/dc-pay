import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newDepartment: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchId,
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount
    } = newDepartment
    const query = `
	INSERT INTO 
        department 
        (
            id,
            organization_id,
            branch_id,
            department_code,
            department_name,
            permanent_account,
            contract_account
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchId,
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount
    ])
    const department = res.rows[0]
    return department
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: departments } = await pool.query(`
    SELECT 
    department.id, 
    department.branch_id, 
    branch.branch_name, 
    department.department_code, 
    department.department_name, 
    department.permanent_account, 
    department.contract_account
    FROM department
    INNER JOIN branch ON department.branch_id = branch.id
    WHERE department.organization_id=$1`,
        [organizationId])
    return departments
}



export const deleteDepartment = async (departmentId: string): Promise<any> => {
    await pool.query('DELETE FROM department WHERE id=$1', [departmentId])
}


export const updateDepartment = async (updatedDepartment: any): Promise<string> => {
    const {
        id,
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount
    } = updatedDepartment
    const query = `
    UPDATE department
    SET department_code = $1,
    department_name = $2,
    permanent_account = $3,
    contract_account = $4
    WHERE id = $5
    RETURNING *;
    `
    const res = await pool.query(query, [
        departmentCode,
        departmentName,
        permanentAccount,
        contractAccount,
        id])
    const departmentId = res.rows[0]
    return departmentId
}



export default {
    create,
    deleteDepartment,
    getAllFromOrganization,
    updateDepartment
}