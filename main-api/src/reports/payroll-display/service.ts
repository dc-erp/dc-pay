
import payrollSheetDao from './dao'

const getAllFromOrganization = async (organizationId: any, employeeId: any): Promise<any> => await payrollSheetDao.getAllFromOrganization(organizationId, employeeId)



export default {
    getAllFromOrganization,
}