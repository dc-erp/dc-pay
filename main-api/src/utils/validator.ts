import { ValidationChain, validationResult } from 'express-validator'
import {Request, Response, NextFunction} from 'express'
/**
 * This code is from https://express-validator.github.io/docs/running-imperatively.html
 * We use it to run validations imperatively
 * @param validations
 */
const validate = (validations: Array<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(422).json({ errors: errors.array() })
    }
}
export const validateAll = (validators: { [key: string]: ValidationChain[] }) => {
    const validator = JSON.parse(JSON.stringify(validators))
    Object.keys(validators).map((key) => {
        validator[key] = validate(validators[key])
    })
    return validator
}
