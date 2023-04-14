import { Request, Response, NextFunction, Router } from 'express'
import menuLevelTwoService from './service'
import userService from '../../../user-management/users/service'


const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const menuLevelTwos = await menuLevelTwoService.getAllFromOrganization(organizationId)
            const renamedMenuLevelOnes = menuLevelTwos.map(({ id, menu_level_one_id, menu_level_one_title, menu_title, menu_path }) => ({
                id,
                menuLevelOneId: menu_level_one_id,
                menuLevelOneTitle: menu_level_one_title,
                menuTitle: menu_title,
                menuPath: menu_path,
            }));
            const filteredData = renamedMenuLevelOnes.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.menuLevelOneTitle.toLowerCase().includes(queryLowered) ||
                    mainParameterDefinition.menuTitle.toLowerCase().includes(queryLowered) ||
                    mainParameterDefinition.menuPath.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMenuLevelOnes,
                menuLevelTwo: filteredData,
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
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const createdMenuLevelTwo = await menuLevelTwoService.create(req, String(organizationId))
            res.send(createdMenuLevelTwo)
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
            await menuLevelTwoService.deleteMenuLevelTwo(String(id))
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
            const updatedMainParameterDefinition = await menuLevelTwoService.updateMenuLevelTwo(req.body.data)
            res.send(updatedMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

export default router
