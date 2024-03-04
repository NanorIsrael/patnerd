import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

import logger from '../logging/logger'
import { accountHandler } from '../data/AccountSource'
import { tokensHandler } from '../data/TokensSource'

class Users {
    static async userCreate(req: Request, res: Response) {
        const email = req.body['email']
        const password = req.body['password']

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json(errors['errors'])
        }
        const datasource = await accountHandler()

        try {
            const user = await datasource.findUser({ email })
            if (user) {
                res.statusCode = 400
                return res.json({ message: 'Email already taken' })
            }

            await datasource.createUser(email, password)

            res.statusCode = 201
            res.json({ message: 'Success' })
        } catch (error) {
            logger.log('debug', error.message)
            res.statusCode = 500
            res.json({ error: 'An error occured.' })
        }
    }

    static async userLogin(req: Request, res: Response) {
        const email = req.body['email']
        const password = req.body['password']

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json(errors['errors'])
        }
        const datasource = await accountHandler()
        const tokenSource = await tokensHandler()

        try {
            const user = await datasource.findUser({ email })
            if (!user) {
                res.statusCode = 401
                return res.json({ message: 'User account does not exist' })
            }
            const validate_password = await bcrypt.compare(
                password,
                user.password,
            )
            if (!validate_password) {
                res.statusCode = 401
                return res.json({ message: 'incorrect password' })
            }
            const sessionId = await tokenSource.createTokens(user.id)
            res.statusCode = 200
            res.cookie('x-auth', sessionId)
            res.json({ message: 'Login successful' })
        } catch (error) {
            logger.log('debug', error.message)
            res.statusCode = 500
            res.json({ error: 'An error occured.' })
        }
    }
}
export default Users
