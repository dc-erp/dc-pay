import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import router from './router'
import compression from 'compression'
import morgan from 'morgan'
import passport from 'passport'
import { authorizeUser } from './config/session'


dotenv.config()
const app = express()

app.use(cors())

app.set('port', process.env.PORT || 4000)
app.use(compression())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.use(passport.initialize())
app.use(authorizeUser)

app.use('/api/v1', router)



export default app