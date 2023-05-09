import pool from '../../config/pool'



export const getSubParameterIdByName = async (parentParameterName: string, parameterName: string): Promise<any> => {
    const { rows: parameterQueryResponse } = await pool.query(`
    SELECT pd.id
    FROM parameter_definition pd
    INNER JOIN parameter_definition parent_pd ON pd.parent_parameter_id = parent_pd.id
    WHERE parent_pd.parameter_name = $1
    AND pd.parameter_name = $2;

    `, [parentParameterName, parameterName])
    return parameterQueryResponse[0].id
}



export default {
    getSubParameterIdByName
}