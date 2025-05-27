import express from 'express'
import { getLogs, getLogsId, postLogs } from '../controllers/logsController.mjs'
// user 
import { userAutentication } from '../middlewares/autenticationMiddleware.mjs'
import { userAuthorization } from '../middlewares/authorizationMiddleware.mjs'

// service 
import { apikeyAutentication } from '../middlewares/apikeyAutenticationMiddleware.mjs'
import { apikeyAutorization } from '../middlewares/apikeyAutorizationMiddleware.mjs'

const router = express.Router()

// logs user autenticacion y autorizacion
router.get('/user',userAutentication,userAuthorization,getLogs)
router.get('/user/:id',userAutentication,userAuthorization,getLogsId)
router.post('/user',userAutentication,postLogs)


// logs para servicios apikey autenticacion y autorizacion 
router.get('/service',apikeyAutentication,apikeyAutorization,getLogs)
router.get('/service/:id',apikeyAutentication,apikeyAutorization,getLogsId)
router.post('/service',apikeyAutentication,postLogs)
export default router