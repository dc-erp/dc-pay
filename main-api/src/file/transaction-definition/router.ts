import { Request, Response, NextFunction, Router } from 'express'
import transactionDefinitionService from './service'
import userService from '../../settings/user-management/users/service'
import parameterDefinitionService from '../parameter-definition/service'

const router = Router()

router.get('/parameter',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { main, sub } = req.query
            const transactionGroupId = await parameterDefinitionService.getSubParameterIdByName(main, sub)
            const transactionDefinition = await transactionDefinitionService.getAllFromTransactionGroup(organizationId, main, transactionGroupId)
            const renamedTransactionDefinition = transactionDefinition.map(({
                id,
                transaction_code,
                transaction_name }) => ({
                    id,
                    transactionCode: transaction_code,
                    transactionName: transaction_name
                }));
            res.send({
                allData: renamedTransactionDefinition,
                transactionDefinition: renamedTransactionDefinition,
                query: req.query,
                total: renamedTransactionDefinition.length
            })

        } catch (e) {
            console.log(e)
            next(e)
        }
    })


router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const employees = await transactionDefinitionService.getAllFromOrganization(organizationId)
            const renamedTransactionDefinition = employees.map(({
                id,
                transaction_code,
                transaction_name,
                short_name,
                transaction_type,
                update_type,
                permanent,
                taxable,
                un_taxable_limit,
                affect_by_leave,
                leave_days,
                affect_back_payroll,
                affect_beneficiary,
                transaction_group,
                gl_entry_by,
                direct_account,
                contract_gl_account,
                transaction_type_name,
                transaction_group_name,
                update_type_name }) => ({
                    id,
                    transactionCode: transaction_code,
                    transactionName: transaction_name,
                    shortName: short_name,
                    transactionType: transaction_type,
                    updateType: update_type,
                    permanent,
                    taxable,
                    unTaxableLimit: un_taxable_limit,
                    affectByLeave: affect_by_leave,
                    leaveDays: leave_days,
                    affectBackPayroll: affect_back_payroll,
                    affectBeneficiary: affect_beneficiary,
                    transactionGroup: transaction_group,
                    glEntryBy: gl_entry_by,
                    directAccount: direct_account,
                    contractGLAccount: contract_gl_account,
                    transactionTypeName: transaction_type_name,
                    transactionGroupName: transaction_group_name,
                    updateTypeName: update_type_name
                }));
            const filteredData = renamedTransactionDefinition.filter(
                transactionDefinition =>
                (
                    transactionDefinition.transactionCode.toLowerCase().includes(queryLowered) ||
                    transactionDefinition.transactionName.toLowerCase().includes(queryLowered)

                )
            )
            res.send({
                allData: renamedTransactionDefinition,
                transactionDefinition: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

router.post('/',
    async (req, res, next) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId, branch_id: branchId } = await userService.getUserAuthorizationInfo(userId)
            const createdTransactionDefinition = await transactionDefinitionService.create({ ...req.body.data, branchId, organizationId })
            res.send(createdTransactionDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    // usersValidations.newUser,
    async (req, res, next) => {
        try {
            const { id } = req.params
            await transactionDefinitionService.deleteTransactionDefinition(String(id))
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
            const updatedTransactionDefinition = await transactionDefinitionService.updateTransactionDefinition(req.body.data)
            res.send(updatedTransactionDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


