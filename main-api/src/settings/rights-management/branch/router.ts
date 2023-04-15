import { Request, Response, NextFunction, Router } from 'express'
import branchRightsService from './service'
import userService from '../../user-management/users/service'



const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const roleId = req.query.role
            const { q = '' } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const branchRights = await branchRightsService.getAllFromOrganization(userAuthInfo, roleId)
            const renamedBranchRight = branchRights.map(({ id, role_id, role_name, branch_name, allowed }) => ({
                id,
                allowed,
                roleName: role_name,
                roleId: role_id,
                branchName: branch_name,
            }));
            const filteredData = renamedBranchRight.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.branchName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedBranchRight,
                branchRight: filteredData,
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
            const organizationId = req.headers['x-organization-id'];
            const createdMainParameterDefinition = await branchRightsService.create(req, String(organizationId))
            res.send(createdMainParameterDefinition)
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
            await branchRightsService.deleteBranchRight(String(id))
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
            const updatedBranchRight = await branchRightsService.updateBranchRight(req.body.data)
            res.send(updatedBranchRight)
        } catch (err) {

            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

export default router
