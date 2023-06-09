import { Request, Response, NextFunction, Router } from 'express'
import rolesService from './service'


const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { q = '', } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const roles = await rolesService.getAllFromOrganization(q, userId)
            const renamedRoles = roles.map(({ id, role_name }: any) => ({
                id,
                roleName: role_name,
            }));
            const filteredData = renamedRoles.filter(
                (role: any) =>
                (
                    role.roleName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedRoles,
                roles: filteredData,
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
            const newRole = req.body.data
            const createdRole = await rolesService.create(newRole, userId)
            res.send(createdRole)
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
            await rolesService.deleteRole(String(id))
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
            const updatedUser = await rolesService.updateRole(req.body.data)
            res.send(updatedUser)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router
