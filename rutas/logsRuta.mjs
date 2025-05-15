import express from 'express'
import { getLogs, postLogs } from '../controllers/logsControlador.mjs'

const router = express.Router()

router.get('/',getLogs)
router.post('/',postLogs)


export default router