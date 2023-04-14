import pool from '../../../config/pool'

export const getAllFromOrganizations = async (organizationId: string) => {
    const { rows: menus } = await pool.query(`
    SELECT c.id, c.parent_id as menu_level_one_id, c.menu_title AS menu_title, c.menu_path, p.menu_title AS menu_level_one_title
    FROM menu_items c
    LEFT JOIN menu_items p ON c.parent_id = p.id
    WHERE c.organization_id =$1`,
        [organizationId])
    return menus
}


export default {
    getAllFromOrganizations
}