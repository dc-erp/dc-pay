import { Router } from 'express'
import holidayRoute from './holiday/router'
import menuSetupRoute from './menu-setup/router'

const router = Router()

router.use('/holiday', holidayRoute)
router.use('/menu-setup', menuSetupRoute)

export default router