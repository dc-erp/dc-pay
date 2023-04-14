import { Router } from 'express'
import authorizationRoute from './authorizer/router'
import fileRouter from './file/router'
import tasksRouter from './tasks/router'
import reportsRouter from './reports/router'
import utilitiesRoute from './utilities/router'
import settingsRoute from './settings/router'

const router = Router()

router.use('/auth', authorizationRoute)
router.use('/file', fileRouter)
router.use('/tasks', tasksRouter)
router.use('/reports', reportsRouter)
router.use('/utilities', utilitiesRoute)
router.use('/settings', settingsRoute)


export default router