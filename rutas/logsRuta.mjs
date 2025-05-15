import express from 'express'
import { getLogs } from '../controllers/logsControlador.mjs'

const router = express.Router()

router.get('/',getLogs)


export default router