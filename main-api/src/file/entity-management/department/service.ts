
import departmentDao from './dao'

const create = async (req: any, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const newMenuId = await departmentDao.create({ ...newMenu })
    return newMenuId
}


const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await departmentDao.getAllFromOrganization(organizationId)

const deleteDepartment = async (userId: string): Promise<any> => await departmentDao.deleteDepartment(userId)

const updateDepartment = async (menuLevelData): Promise<any> => await departmentDao.updateDepartment(menuLevelData)


export default {
    create,
    deleteDepartment,
    getAllFromOrganization,
    updateDepartment
}