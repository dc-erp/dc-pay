import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'


export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchCode,
        branchName
    } = newMenu
    const query = `
	INSERT INTO 
        branch 
        (
            id,
            organization_id,
            branch_code,
            branch_name
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchCode,
        branchName
    ])
    const branch = res.rows[0]
    return branch
}


export const getAllFromOrganization = async (organizationId: string) => {
    const { rows: branches } = await pool.query(`
    SELECT id, branch_code, branch_name
    FROM branch
    WHERE organization_id=$1`,
        [organizationId])
    return branches
}



export const deleteBranch = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM branch WHERE id=$1', [branchId])
}


export const updateBranch = async (updatedBranch: any): Promise<string> => {
    const {
        id,
        branchCode,
        branchName
    } = updatedBranch
    const query = `
    UPDATE branch
    SET branch_code = $1,
    branch_name = $2
    WHERE id=$3
    RETURNING *;
    `
    const res = await pool.query(query, [
        branchCode,
        branchName,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteBranch,
    getAllFromOrganization,
    updateBranch
}