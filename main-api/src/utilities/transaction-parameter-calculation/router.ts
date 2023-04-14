import { Request, Response, NextFunction, Router } from 'express'
import transactionParameterCalculationService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', employee = null, transaction = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const transactionParameterCalculations = await transactionParameterCalculationService.getAllFromOrganization(organizationId)
            const renamedTransactionParameterCalculations = transactionParameterCalculations.map(({
                id,
                first_transaction_id,
                first_transaction_name,
                first_transaction_code,
                second_transaction_id,
                second_transaction_name,
                second_transaction_code,
                third_transaction_id,
                third_transaction_name,
                third_transaction_code,
                calculation_unit,
                first_option,
                second_option,
                rate
            }) => ({
                id,
                firstTransaction: first_transaction_id,
                firstTransactionCode: first_transaction_code,
                firstTransactionName: first_transaction_name,
                secondTransaction: second_transaction_id,
                secondTransactionCode: second_transaction_code,
                secondTransactionName: second_transaction_name,
                thirdTransaction: third_transaction_id,
                thirdTransactionCode: third_transaction_code,
                thirdTransactionName: third_transaction_name,
                calculationUnit: calculation_unit,
                firstOption: first_option,
                secondOption: second_option,
                rate
            }));
            const filteredData = renamedTransactionParameterCalculations.filter(
                transactionParameterCalculation =>
                (
                    transactionParameterCalculation.firstTransactionCode.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.secondTransactionCode.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.thirdTransactionCode.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.firstTransactionName.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.secondTransactionName.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.thirdTransactionName.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.calculationUnit.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.firstOption.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.secondOption.toLowerCase().includes(queryLowered) ||
                    transactionParameterCalculation.rate.toLowerCase().includes(queryLowered)

                )
            )
            res.send({
                allData: renamedTransactionParameterCalculations,
                transactionParameterCalculation: filteredData,
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
            const createdTransactionParameterCalculation = await transactionParameterCalculationService.create({ ...req.body.data })
            res.send(createdTransactionParameterCalculation)
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
            await transactionParameterCalculationService.deleteTransactionParameterCalculation(String(id))
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
            const updatedTransactionParameterCalculation = await transactionParameterCalculationService.updateTransactionParameterCalculation(req.body.data)
            res.send(updatedTransactionParameterCalculation)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


