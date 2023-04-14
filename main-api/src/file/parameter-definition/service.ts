
import parameterDefinitionDao from './dao'

const getSubParameterIdByName = async (parentParameterName: any, parameterName: any): Promise<any[]> => await parameterDefinitionDao.getSubParameterIdByName(parentParameterName, parameterName)


export default {
    getSubParameterIdByName
}