import { Request, Response, NextFunction, Router } from 'express'
import subParameterDefinitionService from './service'
import userService from '../../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: any, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', role = null, status = null } = req.query ?? ''
            const queryLowered = q.toLowerCase()
            const mainParameterDefinitions = await subParameterDefinitionService.getAllFromOrganization(organizationId)
            const renamedMainParameterDefinitions = mainParameterDefinitions.map(({ id, parameter_id, main_parameter_name, sub_parameter_name }) => ({
                id,
                parameterId: parameter_id,
                mainParameterName: main_parameter_name,
                parameterName: sub_parameter_name,
            }));
            const filteredData = renamedMainParameterDefinitions.filter(
                mainParameterDefinition =>
                (
                    mainParameterDefinition.parameterName.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedMainParameterDefinitions,
                subParameterDefinition: filteredData,
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
            const createdMainParameterDefinition = await subParameterDefinitionService.create(req, String(organizationId))
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
            await subParameterDefinitionService.deleteMainParameterDefinition(String(id))
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
            const updatedMainParameterDefinition = await subParameterDefinitionService.updateMainParameterDefinition(req.body.data)
            res.send(updatedMainParameterDefinition)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


