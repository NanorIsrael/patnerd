import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import path from 'path'

import CustomError from './libs/ErroHandler'
import usersRouter from './routes/user'

// import indexRouter from './routes/'
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// app.use(logger('dev'));
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', indexRouter);
app.use('/account', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use((err: CustomError, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`sever running on port ${port}`)
})

export default app
