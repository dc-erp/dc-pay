
import payrollSheetDao from './dao'

const getAllFromOrganization = async (organizationId: any): Promise<any> => await payrollSheetDao.getAllFromOrganization(organizationId)


export default {
    getAllFromOrganization,
}