
import loanTransactionDao from './dao'

const create = async (newLoanTransaction: any,): Promise<string> => await loanTransactionDao.create({ ...newLoanTransaction })

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await loanTransactionDao.getAllFromOrganization(organizationId)

const deleteLoanTransaction = async (userId: string): Promise<any> => await loanTransactionDao.deleteLoanTransaction(userId)

const updateLoanTransaction = async (menuLevelData): Promise<any> => await loanTransactionDao.updateLoanTransaction(menuLevelData)


export default {
    create,
    deleteLoanTransaction,
    getAllFromOrganization,
    updateLoanTransaction
}