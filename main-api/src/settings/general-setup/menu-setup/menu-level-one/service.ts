import menuLevelOneDao from './dao'
import menuRightsService from '../../../rights-management/menu/service'

const create = async (req: any, organizationId: string): Promise<string> => {
    const newMenu = req.body.data
    newMenu.organizationId = organizationId
    newMenu.menuPath = `/apps/${newMenu.menuTitle.toLowerCase().replace(/ /g, '-')}`
    const menuId = await menuLevelOneDao.create({ ...newMenu })
    await menuRightsService.populateForRole(organizationId, menuId)
    return menuId
}

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await menuLevelOneDao.getAllFromOrganization(organizationId)



const getInfo = async (menuLevelOneId: any): Promise<any> => await menuLevelOneDao.getInfo(menuLevelOneId)


const deleteMenuLevelOne = async (menuId: string): Promise<any> => {
    await menuRightsService.deleteForMenu(menuId)
    return await menuLevelOneDao.deleteMenuLevelOne(menuId)
}



const updateMenuLevelOne = async (menuLevelData): Promise<any> => {
    const updatedMenu = menuLevelData
    updatedMenu.menuPath = `${updatedMenu.menuTitle.toLowerCase().replace(/ /g, '-')}`
    return await menuLevelOneDao.updateMenuLevelOne(menuLevelData)
}







export default {
    create,
    getAllFromOrganization,
    getInfo,
    deleteMenuLevelOne,
    updateMenuLevelOne

}