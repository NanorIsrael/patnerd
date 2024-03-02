import {} from 'express-validator'
import { Request, Response } from 'express'

import logger from '../logging/logger'
import { accountHandler } from '../data/Accounts'

class Users {
    static async userCreate(req: Request, res: Response) {
        const email = req.body['email']
        const password = req.body['password']
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
}
export default Users
