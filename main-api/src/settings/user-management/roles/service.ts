import rolesDao from './dao'
// import roleRightService from '../roleRights/service'
import roleBranchService from '../../rights-management/branch/service'
import menuRightsService from '../../rights-management/menu/service'
import userService from '../users/service'


const create = async (newRole: any, userId: any): Promise<string> => {
    const { organization_id: organizationId, branch_id: branchId } = await userService.getUserAuthorizationInfo(userId)
    newRole.organizationId = organizationId
    newRole.branchId = branchId
    const roleId = await rolesDao.create(newRole)
    await roleBranchService.populateForBranch(organizationId, roleId)
    await menuRightsService.populateForMenu(organizationId, roleId)
    return roleId
}

const deleteRole = async (roleId: string): Promise<any> => {
    await menuRightsService.deleteForRole(roleId)
    await roleBranchService.deleteForRole(roleId)
    return await rolesDao.deleteRole(roleId)
}



const getInfo = async (groupId: string): Promise<any> => await rolesDao.getInfo(groupId)

const getInfoByName = async (groupName: string): Promise<any> => await rolesDao.getInfoByName(groupName)

const getAllFromOrganization = async (query: any, userId: any): Promise<any> => {
    const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
    return await rolesDao.getAllFromOrganization(organizationId)
}

const getAllFromOrganizations = async (organizationId: any): Promise<any> => {
    return await rolesDao.getAllFromOrganization(organizationId)
}

const updateRole = async (roleData: any): Promise<any> => await rolesDao.updateRole(roleData)


export default {
    create,
    deleteRole,
    updateRole,
    getInfo,
    getAllFromOrganization,
    getAllFromOrganizations,
    getInfoByName,
}