import { validateAll } from '../../../utils/validator'
import { check } from 'express-validator'


const newUser = [
    check('isActive').isBoolean(),
]


export const usersValidations = {
    newUser,
}

export default validateAll(usersValidations)
