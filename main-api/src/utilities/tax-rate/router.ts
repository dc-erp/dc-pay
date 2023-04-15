import { Request, Response, NextFunction, Router } from 'express'
import taxRateService from './service'
import userService from '../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const taxRates = await taxRateService.getAllFromOrganization(organizationId)
            const renamedTaxRates = taxRates.map(({
                id,
                tax_rate_code,
                lowest_range,
                highest_range,
                tax_rate
            }) => ({
                id,
                taxRateCode: tax_rate_code,
                lowestRange: lowest_range,
                highestRange: highest_range,
                taxRate: tax_rate
            }));
            const filteredData = renamedTaxRates.filter(
                taxRate =>
                (
                    taxRate.taxRateCode.toLowerCase().includes(queryLowered) ||
                    taxRate.lowestRange.toLowerCase().includes(queryLowered) ||
                    taxRate.highestRange.toLowerCase().includes(queryLowered) ||
                    taxRate.taxRate.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedTaxRates,
                taxRate: filteredData,
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
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId, branch_id: branchId } = await userService.getUserAuthorizationInfo(userId)
            const createdTaxRate = await taxRateService.create({ ...req.body.data, organizationId, branchId })
            res.send(createdTaxRate)
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
            await taxRateService.deleteTaxRate(String(id))
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
            const updatedTaxRate = await taxRateService.updateTaxRate(req.body.data)
            res.send(updatedTaxRate)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


