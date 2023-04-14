
import taxRateDao from './dao'

const create = async (newTaxRate: any,): Promise<string> => await taxRateDao.create({ ...newTaxRate })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await taxRateDao.getAllFromOrganization(organizationId)

const deleteTaxRate = async (userId: string): Promise<any> => await taxRateDao.deleteTaxRate(userId)

const updateTaxRate = async (menuLevelData): Promise<any> => await taxRateDao.updateTaxRate(menuLevelData)


export default {
    create,
    deleteTaxRate,
    getAllFromOrganization,
    updateTaxRate
}