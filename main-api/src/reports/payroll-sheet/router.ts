import { Request, Response, NextFunction, Router } from 'express'
import payrollSheetService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', employeeSort = null, branch = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const payrollSheets = await payrollSheetService.getAllFromOrganization(organizationId)
            const renamedPayTransactions = payrollSheets.map(({
                id,
              employeeCode,
              employeeName,
              netPay
            }) => ({
                id,
            employeeCode,
            employeeName,
            netPay
            }));
            const filteredData = renamedPayTransactions.filter(
                payrollSheet =>
                (
                    payrollSheet.employeeCode.toLowerCase().includes(queryLowered) ||
                    payrollSheet.employeeName.toLowerCase().includes(queryLowered) ||
                    payrollSheet.netPay.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedPayTransactions,
                payrollSheet: filteredData,
                query: req.query,
                total: filteredData.length
            })
        } catch (e) {
            next(e)
        }
    })


export default router


