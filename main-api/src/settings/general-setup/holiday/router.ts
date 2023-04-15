import { Request, Response, NextFunction, Router } from 'express'
import holidayService from './service'
import userService from '../../user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const holidays = await holidayService.getAllFromOrganization(organizationId)
            const renamedHolidays = holidays.map(({ id, branch_name, holiday_name, holiday_date }) => ({
                id,
                branchName: branch_name,
                holidayName: holiday_name,
                holidayDate: holiday_date,
            }));
            const filteredData = renamedHolidays.filter(
                holiday =>
                (
                    holiday.holidayName.toLowerCase().includes(queryLowered) ||
                    holiday.branchName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedHolidays,
                holidays: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { branch_id: branchId, organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const createdMainParameterDefinition = await holidayService.create({ branchId, organizationId, ...req.body.data })
            res.send(createdMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

router.delete('/:id',
    // usersValidations.newUser,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            await holidayService.deleteHoliday(String(id))
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
            const updatedMainParameterDefinition = await holidayService.updateHoliday(req.body.data)
            res.send(updatedMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

export default router
