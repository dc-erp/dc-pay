import { Router } from 'express'

import transactionParameterCalculationRoute from './transaction-parameter-calculation/router'
import taxRateRoute from './tax-rate/router'


const router = Router()

router.use('/transaction-parameter-calculation', transactionParameterCalculationRoute)
router.use('/tax-rate', taxRateRoute)

export default router