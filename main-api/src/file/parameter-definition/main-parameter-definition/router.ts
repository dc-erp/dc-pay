import { Request, Response, NextFunction, Router } from 'express'
import mainParameterDefinitionService from './service'
import userService from '../../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = ''} = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const mainParameterDefinitions = await mainParameterDefinitionService.getAllFromOrganization(organizationId)
            const renamedMainParameterDefinitions = mainParameterDefinitions.map(({ id, parameter_name }) => ({
                id,
                parameterName: parameter_name,
            }));
            const filteredData = renamedMainParameterDefinitions.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.parameterName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMainParameterDefinitions,
                mainParameterDefinition: filteredData,
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
            const createdMainParameterDefinition = await mainParameterDefinitionService.create(req, String(organizationId))
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
            await mainParameterDefinitionService.deleteMainParameterDefinition(String(id))
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
            const updatedMainParameterDefinition = await mainParameterDefinitionService.updateMainParameterDefinition(req.body.data)
            res.send(updatedMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


