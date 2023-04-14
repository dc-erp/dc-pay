import { Router } from 'express'
import generalSetupRoute from './general-setup/router'
import userManagementsRoute from './user-management/router'
import rightsManagementRoute from './rights-management/router'

const router = Router()

router.use('/general-setup', generalSetupRoute)
router.use('/user-management', userManagementsRoute)
router.use('/rights-management', rightsManagementRoute)


export default router