import express from 'express'

import Users from '../controllers/users'
const usersRouter = express.Router()

usersRouter.post('/', Users.userCreate)

export default usersRouter
