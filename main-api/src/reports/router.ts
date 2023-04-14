import { Router } from 'express'
import payrollSHeetRoute from './payroll-sheet/router'
import payrollDisplayRoute from './payroll-display/router'


const router = Router()

router.use('/payroll-sheet', payrollSHeetRoute)
router.use('/payroll-display', payrollDisplayRoute)



export default router