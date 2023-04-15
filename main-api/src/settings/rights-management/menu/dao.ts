import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async ({
    roleId,
    menuId,
    editAllowed,
    readAllowed }: any): Promise<string> => {
    const id = uuid()
    const query = `
	INSERT INTO role_menu
     (
        id, 
        role_id, 
        menu_id, 
        edit_allowed, 
        read_allowed
    )
    VALUES 
    (
        $1,
        $2,
        $3,
        $4,
        $5
    )
    RETURNING *
    `
    const res = await pool.query(query, [
        id,
        roleId,
        menuId,
        editAllowed,
        readAllowed
    ])
    return res.rows[0].id
}


export const getAllFromOrganization = async (userAuthInfo: any, roleId: any) => {
    const { organization_id: organizationId, branch_id: branchId } = userAuthInfo
    const { rows: menuRights } = await pool.query(`
    SELECT 
    role_menu.id, 
    user_roles.id AS role_id, 
    user_roles.role_name, 
    menu_items.menu_title, 
    menu_items.id AS menu_id, 
    menu_items.parent_id,
    menu_items.menu_path, 
    role_menu.edit_allowed, 
    role_menu.read_allowed
    FROM role_menu
    JOIN menu_items ON role_menu.menu_id = menu_items.id
    JOIN user_roles ON role_menu.role_id = user_roles.id
    WHERE user_roles.organization_id = $1 
    AND user_roles.branch_id = $2 
    AND role_id = $3
    `,
        [organizationId, branchId, roleId])

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


export const deleteMenuLevelOne = async (menuLevelTwoId: string): Promise<any> => {
    await pool.query('DELETE FROM menu_items WHERE id=$1', [menuLevelTwoId])
}


export const updateMenuLevelOne = async (updatedMenu: any): Promise<string> => {
    const {
        id,
        menuTitle,
        menuPath
    } = updatedMenu
    const query = `
    UPDATE menu_items
    SET menu_title = $1,
    menu_path = $2
    WHERE id = $3
    RETURNING *;
    `
    const res = await pool.query(query, [
        menuTitle,
        menuPath,
        id])
    const mainParameterDefinitionId = res.rows[0]
    return mainParameterDefinitionId
}

export const populateForRole = async (menuId: any, roles: any): Promise<any> => {
    roles.map(async ({ id: roleId }: any) => {
        await create({ menuId, roleId, editAllowed: true, readAllowed: true })
    })
    return true
}

export const populateForMenu = async (roleId: any, menus: any): Promise<any> => {
    menus.map(async ({ id: menuId }: any) => {
        await create({ roleId, menuId, editAllowed: true, readAllowed: true })
    })
    return true
}

export const deleteForRole = async (roleId: any): Promise<any> => {
    await pool.query('DELETE FROM role_menu WHERE role_id=$1', [roleId])
    return true
}

export const deleteForMenu = async (menuId: any): Promise<any> => {
    await pool.query('DELETE FROM role_menu WHERE menu_id=$1', [menuId])
    return true
}


export const updateMenuRightReadAllowed = async (updatedMenu: any): Promise<string> => {
    const {
        id,
        readAllowed
    } = updatedMenu
    const query = `
    UPDATE role_menu
    SET read_allowed = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        readAllowed,
        id])
    const updatedMenuRight = res.rows[0]
    return updatedMenuRight
}

export const updateMenuRightEditAllowed = async (updatedMenu: any): Promise<string> => {
    const {
        id,
        editAllowed
    } = updatedMenu
    const query = `
    UPDATE role_menu
    SET edit_allowed = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        editAllowed,
        id])
    const updatedMenuRight = res.rows[0]
    return updatedMenuRight
}

export default {
    create,
    deleteMenuLevelOne,
    updateMenuLevelOne,
    deleteForRole,
    deleteForMenu,
    getAllFromOrganization,
    populateForRole,
    populateForMenu,
    getInfo,
    updateMenuRightReadAllowed,
    updateMenuRightEditAllowed

}