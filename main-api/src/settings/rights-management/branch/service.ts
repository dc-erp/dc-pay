import {Request } from 'express'
import branchRightsDao from './dao'
import roleService from '../../user-management/roles/service'
import branchService from '../../../file/entity-management/branch/service'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    newMenu.menuPath = newMenu.menuTitle.toLowerCase().replace(/ /g, '-')
    return await branchRightsDao.create({ ...newMenu })
}

const getAllFromOrganization = async (userAuthInfo: any, roleId: any): Promise<any[]> => {
    const menuValues = await branchRightsDao.getAllFromOrganization(userAuthInfo, roleId)
    // const navArray = getNavigationArray(menuValues)
    return menuValues
}



const getInfo = async (menuLevelOneId: any): Promise<any> => await branchRightsDao.getInfo(menuLevelOneId)


const deleteBranchRight = async (userId: string): Promise<any> => await branchRightsDao.deleteBranchRight(userId)



const updateBranchRight = async (branchRightData: any): Promise<any> => {
    const updatedBranchRight = branchRightData
    return await branchRightsDao.updateBranchRight(updatedBranchRight)
}



const populateForRole = async (organizationId: string, branchId: string) => {
    const roles = await roleService.getAllFromOrganizations(organizationId)
    return await branchRightsDao.populateForRole(branchId, roles)
}

const populateForBranch = async (organizationId: string, roleId: string) => {
    const branches = await branchService.getAllFromOrganizations(organizationId)
    return await branchRightsDao.populateForBranch(roleId, branches)
}

const deleteForRole = async (roleId: any): Promise<any> => await branchRightsDao.deleteForRole(roleId)
const deleteForBranch = async (roleId: any): Promise<any> => await branchRightsDao.deleteForBranch(roleId)



export default {
    create,
    getAllFromOrganization,
    getInfo,
    deleteBranchRight,
    populateForRole,
    populateForBranch,
    deleteForRole,
    deleteForBranch,
    updateBranchRight

}