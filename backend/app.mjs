import express from 'express'
import cors from 'cors'
import logsRoute from './rutas/logsRoute.mjs'
import authRoute from './rutas/authRoute.mjs'
import apikeyRoute from './rutas/apiKeyRoute.mjs'
import connectDb from './db.mjs'

connectDb()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/logs',logsRoute)
app.use('/api/auth',authRoute)
app.use('/api/apikey',apikeyRoute)

app.listen(3000, () => {
    console.log('puerto escuchado')
})