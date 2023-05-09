
import membershipDao from './dao'

const create = async (newMembership: any,): Promise<string> => await membershipDao.create({ ...newMembership })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await membershipDao.getAllFromOrganization(organizationId)

const deleteMembership = async (userId: string): Promise<any> => await membershipDao.deleteMembership(userId)

const updateMembership = async (menuLevelData: any): Promise<any> => await membershipDao.updateMembership(menuLevelData)


export default {
    create,
    deleteMembership,
    getAllFromOrganization,
    updateMembership
}