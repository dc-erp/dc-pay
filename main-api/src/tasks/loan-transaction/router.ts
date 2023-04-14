import { Response, NextFunction, Router } from 'express'
import loanTransactionService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '' } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const loanTransactions = await loanTransactionService.getAllFromOrganization(organizationId)
            const renamedLoanTransactions = loanTransactions.map(({
                id,
                employee_id,
                transaction_id,
                total_loan,
                transaction_amount,
                employee_code,
                employee_first_name,
                employee_last_name,
                transaction_code,
                transaction_name,
                remaining_balance
            }) => ({
                id,
                employeeId: employee_id,
                transactionId: transaction_id,
                totalLoan: total_loan,
                transactionAmount: transaction_amount,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                transactionCode: transaction_code,
                transactionName: transaction_name,
                remainingBalance: remaining_balance
            }));
            const filteredData = renamedLoanTransactions.filter(
                loanTransaction =>
                (
                    loanTransaction.employeeCode.toLowerCase().includes(queryLowered) ||
                    loanTransaction.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    loanTransaction.employeeLastName.toLowerCase().includes(queryLowered) ||
                    loanTransaction.transactionCode.toLowerCase().includes(queryLowered) ||
                    loanTransaction.transactionName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedLoanTransactions,
                loanTransaction: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })

router.post('/',
    async (req, res, next) => {
        try {
            const createdLoanTransaction = await loanTransactionService.create({ ...req.body.data })
            res.send(createdLoanTransaction)
        } catch (err) {
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params
            await loanTransactionService.deleteLoanTransaction(String(id))
            res.send(200)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.put('/',
    async (req, res, next) => {
        try {
            const updatedLoanTransaction = await loanTransactionService.updateLoanTransaction(req.body.data)
            res.send(updatedLoanTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


