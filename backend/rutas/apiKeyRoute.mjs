import express from 'express'
import { createApiKey } from '../controllers/apiKeyController.mjs'
import { userAutentication } from '../middlewares/autenticationMiddleware.mjs'
import { userAuthorization } from '../middlewares/authorizationMiddleware.mjs'


const route = express.Router()


route.post('/create',userAutentication,userAuthorization,createApiKey)


export default route