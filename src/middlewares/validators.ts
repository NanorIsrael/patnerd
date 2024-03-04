import { body } from 'express-validator'

export const validators = {
    isemail: body('email').isEmail(),
    isValidPassword: body('password')
        .isString()
        .isLength({ min: 8 }),
}
