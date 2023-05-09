import { Request, Response, NextFunction, Router } from 'express'
import discontinuationService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '',} = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const discontinuations = await discontinuationService.getAllFromOrganization(organizationId)
            const renamedDiscontinuations = discontinuations.map(({
                id,
                employee_id,
                action_type,
                action_type_name,
                discontinuation_date,
                reference_number,
                employee_code,
                employee_first_name,
                employee_last_name
            }) => ({
                id,
                employeeId: employee_id,
                referenceNumber: reference_number,
                employeeCode: employee_code,
                employeeFirstName: employee_first_name,
                employeeLastName: employee_last_name,
                actionType: action_type,
                actionTypeName: action_type_name,
                discontinuationDate: discontinuation_date

            }));
            const filteredData = renamedDiscontinuations.filter(
                discontinuation =>
                (
                    discontinuation.employeeCode.toLowerCase().includes(queryLowered) ||
                    discontinuation.employeeFirstName.toLowerCase().includes(queryLowered) ||
                    discontinuation.employeeLastName.toLowerCase().includes(queryLowered) ||
                    discontinuation.actionTypeName.toLowerCase().includes(queryLowered) ||
                    discontinuation.referenceNumber.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedDiscontinuations,
                discontinuation: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createdDiscontinuation = await discontinuationService.create({ ...req.body.data })
            res.send(createdDiscontinuation)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            await discontinuationService.deleteDiscontinuation(String(id))
            res.send(200)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.put('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedDiscontinuation = await discontinuationService.updateDiscontinuation(req.body.data)
            res.send(updatedDiscontinuation)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


