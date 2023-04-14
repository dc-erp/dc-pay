import menuRightsDao from './dao'
import roleService from '../../user-management/roles/service'
import menuService from '../../general-setup/menu-setup/service'


const create = async (req: any, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    newMenu.menuPath = newMenu.menuTitle.toLowerCase().replace(/ /g, '-')
    return await menuRightsDao.create({ ...newMenu })
}

const getAllFromOrganization = async (userAuthInfo: any, roleId: any): Promise<any[]> => await menuRightsDao.getAllFromOrganization(userAuthInfo, roleId)


const getInfo = async (menuLevelOneId: any): Promise<any> => await menuRightsDao.getInfo(menuLevelOneId)


const deleteMenuLevelOne = async (userId: string): Promise<any> => await menuRightsDao.deleteMenuLevelOne(userId)



const updateMenuRight = async (menuRightData): Promise<any> => {
    const updatedMenuRight = menuRightData
    if (updatedMenuRight.readAllowed)
        return await menuRightsDao.updateMenuRightReadAllowed(updatedMenuRight)
    if (updatedMenuRight.editAllowed)
        return await menuRightsDao.updateMenuRightEditAllowed(updatedMenuRight)
}



const populateForRole = async (organizationId: string, menuId: string) => {
    const roles = await roleService.getAllFromOrganizations(organizationId)
    return await menuRightsDao.populateForRole(menuId, roles)
}

const populateForMenu = async (organizationId: string, menuId: string) => {
    const menus = await menuService.getAllFromOrganizations(organizationId)
    return await menuRightsDao.populateForMenu(menuId, menus)
}


const deleteForRole = async (roleId: any): Promise<any> => await menuRightsDao.deleteForRole(roleId)

const deleteForMenu = async (menuId: any): Promise<any> => await menuRightsDao.deleteForMenu(menuId)




export default {
    create,
    getAllFromOrganization,
    getInfo,
    deleteMenuLevelOne,
    deleteForRole,
    deleteForMenu,
    populateForRole,
    populateForMenu,
    updateMenuRight

}