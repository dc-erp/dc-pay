import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async ({
    roleId,
    branchId,
    allowed }: any): Promise<string> => {
    const id = uuid()
    const query = `
	INSERT INTO role_branch
     (
        id, 
        role_id, 
        branch_id, 
        allowed
    )
    VALUES 
    (
        $1,
        $2,
        $3,
        $4
    )
    RETURNING *
    `
    const res = await pool.query(query, [
        id,
        roleId,
        branchId,
        allowed
    ])
    return res.rows[0].id
}


export const getAllFromOrganization = async (userAuthInfo: any, roleId: any) => {
    const { organization_id: organizationId} = userAuthInfo
    const { rows: menuRights } = await pool.query(`
    SELECT 
    rb.id, 
    rb.allowed, 
    ur.role_name,
    ur.id as role_id,
    br.branch_name
    FROM role_branch rb
    JOIN user_roles ur ON ur.id = rb.role_id
    JOIN branch br ON br.id = rb.branch_id
    WHERE ur.organization_id = $1
    AND ur.id = $2
    `,
        [organizationId, roleId])
    return menuRights
}

export const getInfo = async (menuLevelOneId: string) => {
    const { rows: menus } = await pool.query(`
    SELECT 
    id, 
    menu_title,
    menu_path
    FROM menu_items
    WHERE id=$1`,
        [menuLevelOneId])
    return menus[0]
}


export const deleteBranchRight = async (menuLevelTwoId: string): Promise<any> => {
    await pool.query('DELETE FROM menu_items WHERE id=$1', [menuLevelTwoId])
}

export const populateForRole = async (branchId: any, roles: any): Promise<any> => {
    roles.map(async ({ id: roleId }: any) => {
        await create({ branchId, roleId, allowed: true })
    })
    return true
}

export const populateForBranch = async (roleId: any, branches: any): Promise<any> => {
    branches.map(async ({ id: branchId }: any) => {
        await create({ roleId, branchId, allowed: true })
    })
    return true
}

export const deleteForRole = async (roleId: any): Promise<any> => {
    await pool.query('DELETE FROM role_branch WHERE role_id=$1', [roleId])
    return true
}

export const deleteForBranch = async (branch: any): Promise<any> => {
    await pool.query('DELETE FROM role_branch WHERE branch_id=$1', [branch])
    return true
}

export const updateBranchRight = async (updatedMenu: any): Promise<string> => {
    const {
        id,
        allowed
    } = updatedMenu
    const query = `
    UPDATE role_branch
    SET allowed = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        allowed,
        id])
    const updatedBranchRight = res.rows[0]
    return updatedBranchRight
}

export default {
    create,
    deleteBranchRight,
    updateBranchRight,
    getAllFromOrganization,
    populateForRole,
    populateForBranch,
    deleteForRole,
    deleteForBranch,
    getInfo,

}