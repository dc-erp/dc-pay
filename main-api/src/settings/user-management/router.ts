import { Router } from 'express'

import userRoute from './users/router'
import rolesRoute from './roles/router'



const router = Router()

router.use('/users', userRoute)
router.use('/roles', rolesRoute)



export default router