import { Router } from 'express'

import mainParameterDefinitionRoute from './main-parameter-definition/router'
import subParameterDefinitionRoute from './sub-parameter-definition/router'


const router = Router()

router.use('/main-parameter-definition', mainParameterDefinitionRoute)
router.use('/sub-parameter-definition', subParameterDefinitionRoute)


export default router