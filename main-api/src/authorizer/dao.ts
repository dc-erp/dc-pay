import pool from '../config/pool'
import { compare } from '../utils/encrypt'

export const comparePassword = async (email: string, password: string): Promise<any> => {
    const result = await pool.query('SELECT * FROM user_accounts WHERE email=$1', [email])
    const user = result?.rows[0]
    const isMatch = await compare(password, user?.password)
    delete user?.password
    const { rows } = await pool.query(`
    SELECT ru.role_id, ur.role_name, rb.branch_id
    FROM user_accounts ua
    JOIN role_user ru ON ua.id = ru.user_id
    JOIN user_roles ur ON ru.role_id = ur.id
    JOIN role_branch rb ON ru.role_id = rb.role_id
    WHERE ua.id  = $1;
    `, [user?.id])
    user.role = rows[0].role_name.toLowerCase()
    user.branchId = rows[0].branch_id.toLowerCase()
    return { isMatch, user }
}



export const getNavigationMenu = async (roleId: string) => {
    // const roleId = '78623c3a-d5f7-4e60-90dd-e9fec1154353'
    const navigationQueryResponse = await pool.query(`
    SELECT
    parent.menu_title AS title,
    'AccountOutline' AS icon,
    ARRAY_AGG(
        json_build_object(
            'title', child.menu_title,
            'path', child.menu_path
        )
    ) AS children
FROM
    menu_items AS parent
    LEFT JOIN role_menu ON role_menu.menu_id = parent.id
    LEFT JOIN menu_items AS child ON child.parent_id = parent.id
WHERE
    role_menu.read_allowed = TRUE
    AND role_menu.role_id = $1
GROUP BY
    parent.menu_title, parent.id
HAVING
    COUNT(child.id) > 0;
    `, [roleId])
    const rawNavigationMenu = navigationQueryResponse.rows
    return rawNavigationMenu
}

export default {
    comparePassword,
    getNavigationMenu,
}