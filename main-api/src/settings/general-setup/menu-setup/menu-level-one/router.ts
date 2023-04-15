import { Request, Response, NextFunction, Router } from 'express'
import menuLevelOneService from './service'
import userService from '../../../user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '' } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const menuLevelOnes = await menuLevelOneService.getAllFromOrganization(organizationId)
            const renamedMenuLevelOnes = menuLevelOnes.map(({ id, menu_title, menu_path }) => ({
                id,
                menuTitle: menu_title,
                menuPath: menu_path,
            }));
            const filteredData = renamedMenuLevelOnes.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.menuTitle.toLowerCase().includes(queryLowered) ||
                    mainParameterDefinition.menuPath.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMenuLevelOnes,
                menuLevelOne: filteredData,
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
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const createdMainParameterDefinition = await menuLevelOneService.create(req, String(organizationId))
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
            await menuLevelOneService.deleteMenuLevelOne(String(id))
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
            const updatedMainParameterDefinition = await menuLevelOneService.updateMenuLevelOne(req.body.data)
            res.send(updatedMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

export default router
