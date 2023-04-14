import { Request, Response, NextFunction, Router } from 'express'
import payTransactionService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', employee = null, transaction = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const payTransactions = await payTransactionService.getAllFromOrganization(organizationId)
            const renamedPayTransactions = payTransactions.map(({
                id,
                employee_id,
                transaction_id,
                transaction_amount,
                employee_code,
                employee_first_name,
                employee_last_name,
                transaction_code,
                transaction_name,
                transaction_type_name
            }) => ({
                id,
                employeeId: employee_id,
                transactionId: transaction_id,
                transactionAmount: transaction_amount,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                transactionCode: transaction_code,
                transactionName: transaction_name,
                transactionTypeName: transaction_type_name
            }));
            const filteredData = renamedPayTransactions.filter(
                payTransaction =>
                (
                    payTransaction.employeeCode.toLowerCase().includes(queryLowered) ||
                    payTransaction.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    payTransaction.employeeLastName.toLowerCase().includes(queryLowered) ||
                    payTransaction.transactionCode.toLowerCase().includes(queryLowered) ||
                    payTransaction.transactionName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedPayTransactions,
                payTransaction: filteredData,
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
            const createdPayTransaction = await payTransactionService.create({ ...req.body.data })
            res.send(createdPayTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params
            await payTransactionService.deletePayTransaction(String(id))
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
            const updatedPayTransaction = await payTransactionService.updatePayTransaction(req.body.data)
            res.send(updatedPayTransaction)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


