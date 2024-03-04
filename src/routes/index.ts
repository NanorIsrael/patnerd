import express from 'express'

const indexRouter = express.Router()

indexRouter.get('/', (req, res) => {
    res.send('Patnerd v1')
})

export default indexRouter
