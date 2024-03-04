import express from 'express'

import Users from '../controllers/users'
import { validators } from '../middlewares/validators'

const usersRouter = express.Router()

usersRouter.post(
    '/',
    [validators.isemail, validators.isValidPassword],
    Users.userCreate,
)

usersRouter.post(
    '/tokens',
    [validators.isemail, validators.isValidPassword],
    Users.userLogin,
)

export default usersRouter
