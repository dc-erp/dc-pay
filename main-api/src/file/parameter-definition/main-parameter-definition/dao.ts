import pool from '../../../config/pool'
import { v4 as uuid } from 'uuid'

export const create = async (newMainParameterDefinition: any): Promise<any> => {
    const id = uuid()
    const {
        organizationId,
        parameterName,
    } = newMainParameterDefinition
    const query = `
	INSERT INTO 
        parameter_definition 
        (
            id,
            organization_id,
            parameter_name,
            parent_parameter_id
            ) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `
    const res = await pool.query(query, [
        id,
        organizationId,
        parameterName,
        null
    ])
    const mainParameterDefinition = res.rows[0]
    return mainParameterDefinition
}


export const getAllFromOrganization = async (organizationId: string): Promise<any> => {
    const { rows: mainParameterDefinitions } = await pool.query(`
    SELECT 
    id, 
    parameter_name
    FROM parameter_definition
    WHERE organization_id=$1 AND parent_parameter_id IS NULL`,
        [organizationId])
    return mainParameterDefinitions
}



export const deleteMainParameterDefinition = async (mainParameterDefinitionId: string): Promise<any> => {
    await pool.query('DELETE FROM parameter_definition WHERE id=$1', [mainParameterDefinitionId])
}


export const updateMainParameterDefinition = async (updatedMainParameterDefinition: any): Promise<string> => {
    const {
        id,
        parameterName
    } = updatedMainParameterDefinition
    const query = `
    UPDATE parameter_definition
    SET parameter_name = $1
    WHERE id = $2
    RETURNING *;
    `
    const res = await pool.query(query, [
        parameterName,
        id])
    const mainParameterDefinitionId = res.rows[0]
    return mainParameterDefinitionId
}



export default {
    create,
    deleteMainParameterDefinition,
    getAllFromOrganization,
    updateMainParameterDefinition
}