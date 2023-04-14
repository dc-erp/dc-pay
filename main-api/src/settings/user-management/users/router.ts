import { Request, Response, NextFunction, Router } from 'express'
import userService from './service'


const router = Router()


router.get('/:id',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const userData = await userService.getInfo(String(id))
            res.send(userData)
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const users = await userService.getAllFromOrganization(userAuthInfo)
            const renamedUsers = users.map(({ id, role_id, first_name, last_name, email, role_name }) => ({
                id,
                roleId: role_id,
                firstName: first_name,
                lastName: last_name,
                email: email,
                roleName: role_name,
            }));
            const filteredData = renamedUsers.filter(
                user =>
                (
                    user.roleName.toLowerCase().includes(queryLowered) ||
                    user.firstName.toLowerCase().includes(queryLowered) ||
                    user.lastName.toLowerCase().includes(queryLowered) ||
                    user.email.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedUsers,
                users: filteredData,
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
            const createdUser = await userService.create(req, userAuthInfo)
            res.send(createdUser)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })


router.put('/',
    // usersValidations.newUser,
    async (req, res, next) => {
        try {
            const updatedUser = await userService.updateUser(req.body.data)
            res.send(updatedUser)
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
            await userService.deleteUser(String(id))
            res.send(200)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })


export default router


