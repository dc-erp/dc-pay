
import transactionDefinitionDao from './dao'

const create = async (newTransactionDefinition: any): Promise<string> => await transactionDefinitionDao.create({ ...newTransactionDefinition })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await transactionDefinitionDao.getAllFromOrganization(organizationId)

const getByName = async (transactionName: any): Promise<any> => await transactionDefinitionDao.getByName(transactionName)

const deleteTransactionDefinition = async (userId: string): Promise<any> => await transactionDefinitionDao.deleteTransactionDefinition(userId)

const updateTransactionDefinition = async (transactionDefinition: any): Promise<any> => await transactionDefinitionDao.updateTransactionDefinition(transactionDefinition)

const getAllFromTransactionGroup = async (organizationId: any, main: any, transactionGroupId: any): Promise<any[]> => await transactionDefinitionDao.getAllFromTransactionGroup(organizationId, main, transactionGroupId)


export default {
    create,
    deleteTransactionDefinition,
    getAllFromOrganization,
    getAllFromTransactionGroup,
    getByName,
    updateTransactionDefinition
}