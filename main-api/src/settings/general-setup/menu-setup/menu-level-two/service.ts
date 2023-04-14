import menuLevelTwoDao from './dao'
import menuLevelOneService from '../menu-level-one/service'
import menuRightsService from '../../../rights-management/menu/service'

// Make Branches Populate Right
// Make Rights Populate Branch

const create = async (req: any, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    const { menu_path: parentPath } = await menuLevelOneService.getInfo(newMenu.menuLevelOneId)
    newMenu.menuPath = `${parentPath}/${newMenu.menuTitle.toLowerCase().replace(/ /g, '-')}`
    const menuId = await menuLevelTwoDao.create({ ...newMenu })
    await menuRightsService.populateForRole(organizationId, menuId)
    return menuId
}

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await menuLevelTwoDao.getAllFromOrganization(organizationId)


const deleteMenuLevelTwo = async (menuId: string): Promise<any> => {
    await menuRightsService.deleteForMenu(menuId)
    return await menuLevelTwoDao.deleteMenuLevelTwo(menuId)
}



const updateMenuLevelTwo = async (menuLevelData): Promise<any> => {
    const updatedMenu = menuLevelData
    const { menu_path: parentPath } = await menuLevelOneService.getInfo(menuLevelData.menuLevelOneId)
    updatedMenu.menuPath = `${parentPath}/${updatedMenu.menuTitle.toLowerCase().replace(/ /g, '-')}`
    return await menuLevelTwoDao.updateMenuLevelTwo(menuLevelData)
}





export default {
    create,
    deleteMenuLevelTwo,
    getAllFromOrganization,
    updateMenuLevelTwo,

}