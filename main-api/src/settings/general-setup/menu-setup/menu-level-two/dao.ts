import pool from '../../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async ({ organizationId, menuTitle, menuLevelOneId, menuPath }: any): Promise<string> => {
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
        menuLevelOneId,
        menuTitle,
        menuPath
    ])
    return res.rows[0].id
}

export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: menus } = await pool.query(`
    SELECT c.id, c.parent_id as menu_level_one_id, c.menu_title AS menu_title, c.menu_path, p.menu_title AS menu_level_one_title
    FROM menu_items c
    LEFT JOIN menu_items p ON c.parent_id = p.id
    WHERE c.organization_id =$1 AND c.parent_id IS NOT NULL;`,
        [organizationId])
    return menus
}



export const deleteMenuLevelTwo = async (menuLevelTwoId: string): Promise<any> => {
    await pool.query('DELETE FROM menu_items WHERE id=$1', [menuLevelTwoId])
}


export const updateMenuLevelTwo = async (updatedMenu: any): Promise<string> => {
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
    deleteMenuLevelTwo,
    getAllFromOrganization,
    updateMenuLevelTwo

}