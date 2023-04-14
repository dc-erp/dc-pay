import { Request, Response, NextFunction, Router } from 'express'
import branchService from './service'
import userService from '../../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const branches = await branchService.getAllFromOrganization(userAuthInfo)
            const renamedBranches = branches.map(({ id, branch_code, branch_name }) => ({
                id,
                branchCode: branch_code,
                branchName: branch_name,
            }));
            const filteredData = renamedBranches.filter(
                branch =>
                (
                    branch.branchCode.toLowerCase().includes(queryLowered) ||
                    branch.branchName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedBranches,
                branch: filteredData,
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
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const createdBranch = await branchService.create(req, userAuthInfo)
            res.send(createdBranch)
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
            await branchService.deleteBranch(String(id))
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
            const updatedBranch = await branchService.updateBranch(req.body.data)
            res.send(updatedBranch)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


