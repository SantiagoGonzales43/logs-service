import express from 'express'
import cors from 'cors'
import logsRuta from './rutas/logsRuta.mjs'
import connectDb from './db.mjs'

connectDb()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/logs',logsRuta)


app.listen(3000, () => {
    console.log('puerto escuchado')
})