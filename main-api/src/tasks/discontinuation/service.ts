
import discontinuationDao from './dao'

const create = async (newDiscontinuation: any,): Promise<string> => await discontinuationDao.create({ ...newDiscontinuation })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await discontinuationDao.getAllFromOrganization(organizationId)

const deleteDiscontinuation = async (userId: string): Promise<any> => await discontinuationDao.deleteDiscontinuation(userId)

const updateDiscontinuation = async (menuLevelData: any): Promise<any> => await discontinuationDao.updateDiscontinuation(menuLevelData)


export default {
    create,
    deleteDiscontinuation,
    getAllFromOrganization,
    updateDiscontinuation
}