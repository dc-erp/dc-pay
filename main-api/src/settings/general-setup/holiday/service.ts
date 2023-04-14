import holidayDao from './dao'

const create = async (newHoliday: any): Promise<string> => await holidayDao.create(newHoliday)

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await holidayDao.getAllFromOrganization(organizationId)

const getInfo = async (holidayId: any): Promise<any> => await holidayDao.getInfo(holidayId)

const deleteHoliday = async (holidayId: string): Promise<any> => await holidayDao.deleteHoliday(holidayId)

const updateHoliday = async (holidayData: any): Promise<any> => await holidayDao.updateHoliday(holidayData)

export default {
    create,
    getAllFromOrganization,
    getInfo,
    deleteHoliday,
    updateHoliday

}