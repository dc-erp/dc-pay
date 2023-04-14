import { Router } from 'express'

import entityManagementRoute from './entity-management/router'
import employeeMasterRoute from './employee-master/router'
import parameterDefinitionRoute from './parameter-definition/router'
import transactionDefinitionRoute from './transaction-definition/router'




const router = Router()

router.use('/entity-management', entityManagementRoute)
router.use('/employee-master', employeeMasterRoute)
router.use('/parameter-definition', parameterDefinitionRoute)
router.use('/transaction-definition', transactionDefinitionRoute)


export default router