
import payTransactionDao from './dao'

const create = async (newPayTransaction: any,): Promise<string> => await payTransactionDao.create({ ...newPayTransaction })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await payTransactionDao.getAllFromOrganization(organizationId)

const deletePayTransaction = async (userId: string): Promise<any> => await payTransactionDao.deletePayTransaction(userId)

const updatePayTransaction = async (menuLevelData: any): Promise<any> => await payTransactionDao.updatePayTransaction(menuLevelData)


export default {
    create,
    deletePayTransaction,
    getAllFromOrganization,
    updatePayTransaction
}