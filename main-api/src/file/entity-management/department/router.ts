import { Request, Response, NextFunction, Router } from 'express'
import departmentService from './service'
import userService from '../../../settings/user-management/users/service'

const router = Router()

router.get('/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.headers['x-user-id'];
            const { organization_id: organizationId } = await userService.getUserAuthorizationInfo(userId)
            const { q = '', } = req.query ?? ''
            const queryLowered = q.toString().toLowerCase()
            const departments = await departmentService.getAllFromOrganization(organizationId)
            const renamedDepartments = departments.map(({ id, branch_id, branch_name, department_code, department_name, permanent_account, contract_account }) => ({
                id,
                branchId: branch_id,
                branchName: branch_name,
                departmentCode: department_code,
                departmentName: department_name,
                permanentAccount: permanent_account,
                contractAccount: contract_account,
            }));
            const filteredData = renamedDepartments.filter(
                department =>
                (
                    department.branchId.toLowerCase().includes(queryLowered) ||
                    department.branchName.toLowerCase().includes(queryLowered) ||
                    department.departmentCode.toLowerCase().includes(queryLowered) ||
                    department.departmentName.toLowerCase().includes(queryLowered) ||
                    department.permanentAccount.toLowerCase().includes(queryLowered) ||
                    department.contractAccount.toLowerCase().includes(queryLowered)
                )
            )
            res.send({
                allData: renamedDepartments,
                department: filteredData,
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
            const createdDepartment = await departmentService.create(req, String(organizationId))
            res.send(createdDepartment)
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
            await departmentService.deleteDepartment(String(id))
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
            const updatedDepartment = await departmentService.updateDepartment(req.body.data)
            res.send(updatedDepartment)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
            next(err)
        }
    })



export default router


