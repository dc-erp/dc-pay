import pool from '../../config/pool'

export const getOrganizationBy = async (organizationId: string) => {
    const { rows: users } = await pool.query(`
    SELECT 
    *
    FROM organizations
    WHERE a.organization_id=$1`,
        [organizationId])
    return users
}
