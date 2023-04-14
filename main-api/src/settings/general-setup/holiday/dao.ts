import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newHoliday: any): Promise<string> => {
    const {
        organizationId,
        branchId,
        holidayName,
        holidayDate
    } = newHoliday
    const id = uuid()
    const query = `
	INSERT INTO holiday
     (
        id, 
        organization_id, 
        branch_id, 
        holiday_name, 
        holiday_date
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
        branchId,
        holidayName,
        new Date(holidayDate)
    ])
    return res.rows[0].id
}

export const getAllFromOrganization = async (organizationId: string) => {
    const { rows: holidays } = await pool.query(`
    SELECT 
    holiday.id, 
    holiday.holiday_name,
    holiday.holiday_date,
    branch.id as branch_id, 
    branch.branch_name
    FROM holiday
    INNER JOIN branch ON holiday.branch_id = branch.id
    WHERE holiday.organization_id=$1`,
        [organizationId])
    console.log(holidays)
    return holidays
}

export const getInfo = async (holidayId: string) => {
    const { rows: holidays } = await pool.query(`
    SELECT 
    id, 
    menu_title,
    menu_path
    FROM menu_items
    WHERE id=$1`,
        [holidayId])
    return holidays[0]
}


export const deleteHoliday = async (holidayId: string): Promise<any> => {
    await pool.query('DELETE FROM holiday WHERE id=$1', [holidayId])
}


export const updateHoliday = async (updatedHoliday: any): Promise<string> => {
    const {
        id,
        holidayName,
        holidayDate
    } = updatedHoliday
    const query = `
    UPDATE holiday
    SET holiday_name = $1,
    holiday_date = $2
    WHERE id = $3
    RETURNING *;
    `
    const res = await pool.query(query, [
        holidayName,
        holidayDate,
        id])
    const holidayId = res.rows[0]
    return holidayId
}


export default {
    create,
    deleteHoliday,
    updateHoliday,
    getAllFromOrganization,
    getInfo

}