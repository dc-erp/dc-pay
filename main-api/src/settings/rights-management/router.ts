import { Router } from 'express'

import branchRoute from './branch/router'
import menuRoute from './menu/router'


const router = Router()

router.use('/branch', branchRoute)
router.use('/menu', menuRoute)



export default router