import { Router } from 'express'

import branchRoute from './branch/router'
import departmentRoute from './department/router'


const router = Router()

router.use('/branch', branchRoute)
router.use('/department', departmentRoute)

export default router