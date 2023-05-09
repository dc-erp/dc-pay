import pool from '../../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async ({ organizationId, menuTitle, menuPath }: any): Promise<string> => {
    const id = uuid()
    const query = `
	INSERT INTO menu_items
     (
        id, 
        organization_id, 
        parent_id, 
        menu_title, 
        menu_path
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
        organizationId,
        null,
        menuTitle,
        menuPath
    ])
    return res.rows[0].id
}

export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: menus } = await pool.query(`
    SELECT 
    id, 
    menu_title,
    menu_path
    FROM menu_items
    WHERE organization_id=$1 AND parent_id IS NULL`,
        [organizationId])
    return menus
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


export default {
    create,
    deleteMenuLevelOne,
    updateMenuLevelOne,
    getAllFromOrganization,
    getInfo

}