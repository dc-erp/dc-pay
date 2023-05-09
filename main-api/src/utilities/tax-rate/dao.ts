import pool from '../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMenu: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        branchId,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    } = newMenu
    const query = `
	INSERT INTO 
        tax_rate 
        (
            id,
            organization_id,
            branch_id,
            tax_rate_code,
            lowest_range,
            highest_range,
            tax_rate
            ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        branchId,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    ])
    return res.rows[0]
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: taxRates } = await pool.query(`
    SELECT 
    tr.id,
    tr.tax_rate_code,
    tr.lowest_range,
    tr.highest_range,
    tr.tax_rate
    FROM tax_rate tr
    WHERE tr.organization_id=$1`,
        [organizationId])
    return taxRates
}



export const deleteTaxRate = async (branchId: string): Promise<any> => {
    await pool.query('DELETE FROM tax_rate WHERE id=$1', [branchId])
}


export const updateTaxRate = async (updatedTaxRate: any): Promise<string> => {
    const {
        id,
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate
    } = updatedTaxRate
    const query = `
    UPDATE tax_rate
    SET tax_rate_code = $1,
    lowest_range = $2,
    highest_range = $3,
    tax_rate = $4
    WHERE id = $5
    RETURNING *;
    `
    const res = await pool.query(query, [
        taxRateCode,
        lowestRange,
        highestRange,
        taxRate,
        id])
    const branchId = res.rows[0]
    return branchId
}



export default {
    create,
    deleteTaxRate,
    getAllFromOrganization,
    updateTaxRate
}