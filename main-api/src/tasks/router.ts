import { Router } from 'express'
import loanTransactionRoute from './loan-transaction/router'
import payTransactionRoute from './pay-transaction/router'
import membershipRoute from './membership/router'
import discontinuationRoute from './discontinuation/router'

const router = Router()

router.use('/loan-transaction', loanTransactionRoute)
router.use('/pay-transaction', payTransactionRoute)
router.use('/membership', membershipRoute)
router.use('/discontinuation', discontinuationRoute)


export default router