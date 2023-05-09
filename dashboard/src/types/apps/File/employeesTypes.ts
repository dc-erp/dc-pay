
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type EmployeeLayoutType = {
  id: string | undefined
}
export type EmployeesType = {
  id: number
  employeeCode: string
  employeeBranch: string
  employeeDepartment: string
  firstName: string
  lastName: string
  basicSalary: string
  employmentDate: string
  sex: string
  employeeStatus: string
  employeeType: string
  employeePosition: string
  contractStartDate: string
  contractEndDate: string
  monthlyWorkingHours: string
  pensionNumber: string
  tinNumber: string
  workingDays: string
  employeeBankAccount: string
  employeeBank: string
  avatarColor?: ThemeColor
}