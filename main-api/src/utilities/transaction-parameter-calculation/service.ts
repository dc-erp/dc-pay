
import transactionParameterCalculationDao from './dao'

const create = async (newTransactionParameterCalculation: any,): Promise<string> => await transactionParameterCalculationDao.create({ ...newTransactionParameterCalculation })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await transactionParameterCalculationDao.getAllFromOrganization(organizationId)

const deleteTransactionParameterCalculation = async (userId: string): Promise<any> => await transactionParameterCalculationDao.deleteTransactionParameterCalculation(userId)

const updateTransactionParameterCalculation = async (menuLevelData: any): Promise<any> => await transactionParameterCalculationDao.updateTransactionParameterCalculation(menuLevelData)


export default {
    create,
    deleteTransactionParameterCalculation,
    getAllFromOrganization,
    updateTransactionParameterCalculation
}