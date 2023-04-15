import {Request} from 'express'
import mainParameterDefinitionDao from './dao'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const newMenuId = await mainParameterDefinitionDao.create({ ...newMenu })
    return newMenuId
}
const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await mainParameterDefinitionDao.getAllFromOrganization(organizationId)

const deleteMainParameterDefinition = async (userId: string): Promise<any> => await mainParameterDefinitionDao.deleteMainParameterDefinition(userId)

const updateMainParameterDefinition = async (menuLevelData: any): Promise<any> => await mainParameterDefinitionDao.updateMainParameterDefinition(menuLevelData)

export default {
    create,
    deleteMainParameterDefinition,
    getAllFromOrganization,
    updateMainParameterDefinition
}