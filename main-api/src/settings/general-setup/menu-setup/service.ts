import menuSetupDao from './dao'

export const getAllFromOrganizations = async (organizationId: string) => await menuSetupDao.getAllFromOrganizations(organizationId)

export default {
    getAllFromOrganizations
}