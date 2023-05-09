import {Request } from 'express'
import employeeDao from './dao'
import payTransactionService from '../../tasks/pay-transaction/service'
import transctionDefinitionService from '../transaction-definition/service'

const create = async (req: Request, organizationId: string): Promise<string> => {
    const newEmployee = req.body.data
    newEmployee.organizationId = organizationId
    const newEmployeeId = await employeeDao.create({ ...newEmployee })
    const basicSalaryId = await transctionDefinitionService.getByName('Basic Salary')
     await payTransactionService.create({employeeId: newEmployeeId.id, transactionId: basicSalaryId?.id, transactionAmount: newEmployee.basicSalary})
    return newEmployeeId
}

const getAllFromOrganization = async (organizationId: any): Promise<any[]> => await employeeDao.getAllFromOrganization(organizationId)

const deleteEmployee = async (userId: string): Promise<any> => await employeeDao.deleteEmployee(userId)

const updateEmployee = async (employeeData: any): Promise<any> => await employeeDao.updateEmployee(employeeData)

export default {
    create,
    deleteEmployee,
    getAllFromOrganization,
    updateEmployee
}