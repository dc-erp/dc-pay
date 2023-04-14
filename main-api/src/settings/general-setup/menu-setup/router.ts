import { Router } from 'express'
import menuLevelOneRoute from './menu-level-one/router'
import menuLevelTwoRoute from './menu-level-two/router'

const router = Router()

router.use('/menu-level-one', menuLevelOneRoute)
router.use('/menu-level-two', menuLevelTwoRoute)


export default router