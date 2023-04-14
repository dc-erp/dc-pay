import { Request, Response, NextFunction, Router } from 'express'
import menuRightsService from './service'
import userService from '../../user-management/users/service'



const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const userAuthInfo = await userService.getUserAuthorizationInfo(userId)
            const roleId = req.query.role
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const menuLevelOnes = await menuRightsService.getAllFromOrganization(userAuthInfo, roleId)
            const renamedMenuLevelOnes = menuLevelOnes.map(({ id, role_id, role_name, menu_title, menu_id, edit_allowed, read_allowed }) => ({
                id,
                roleName: role_name,
                roleId: role_id,
                menuTitle: menu_title,
                menuId: menu_id,
                editAllowed: edit_allowed,
                readAllowed: read_allowed
            }));
            const filteredData = renamedMenuLevelOnes.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.menuTitle.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMenuLevelOnes,
                menuRight: filteredData,
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
            const organizationId = req.headers['x-organization-id'];
            const createdMainParameterDefinition = await menuRightsService.create(req, String(organizationId))
            res.send(createdMainParameterDefinition)
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
            await menuRightsService.deleteMenuLevelOne(String(id))
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
            const updatedMenuRight = await menuRightsService.updateMenuRight(req.body.data)
            res.send(updatedMenuRight)
        } catch (err) {

            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })

export default router
