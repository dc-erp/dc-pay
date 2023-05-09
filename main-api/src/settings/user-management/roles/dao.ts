import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newRole: any,): Promise<string> => {
    const id = uuid()
    const {
        roleName,
        branchId,
        organizationId
    } = newRole
    const query = `
	INSERT INTO user_roles (
        id, 
        role_name, 
        branch_id,
        organization_id) 
        VALUES (
        $1, 
        $2,
        $3,
        $4
        ) RETURNING id;
    `
    const res = await pool.query(query, [
        id,
        roleName,
        branchId,
        organizationId])
    const roleId = res.rows[0].id
    return roleId
}

export const deleteRole = async (roleId: string): Promise<any> => await pool.query('DELETE FROM user_roles WHERE id=$1', [roleId])



export const getInfo = async (roleId: string) => {
    const { rows } = await pool.query('SELECT * FROM user_roles WHERE id=$1', [roleId])
    return rows[0]
}

export const getInfoByName = async (roleName: string) => {
    const { rows } = await pool.query('SELECT * FROM user_roles WHERE role_name=$1', [roleName])
    return rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows } = await pool.query(`
    SELECT * FROM user_roles WHERE organization_id=$1
    `  , [organizationId])
    return rows
}

export const updateRole = async (updatedRole: any): Promise<string> => {
    const {
        id,
        roleName
    } = updatedRole
    const query = `
    UPDATE user_roles
    SET role_name = $1
    WHERE id=$2
    RETURNING *;
    `
    const res = await pool.query(query, [
        roleName,
        id])
    return res.rows[0]
}

export default {
    create,
    deleteRole,
    getInfo,
    getInfoByName,
    getAllFromOrganization,
    updateRole,
}