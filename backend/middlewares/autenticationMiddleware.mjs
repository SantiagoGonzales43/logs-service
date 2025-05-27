import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import {promisify} from 'util'

const secretKey = process.env.JWT_SECRET_KEY

const jwtVerify = promisify(jwt.verify)


export async function userAutentication(req,res,next) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
      return res.status(401).json({message: 'Token no proporcionado'})
    }

    const decoded = await jwtVerify(token,secretKey)
    req.user = decoded
    next()
  } catch (error) {
    console.log(`Error en el middleware de autenticacion`,error)
    if(error.name === 'TokenExpiredError') {
        res.status(403).json({message: `Su token a expirado inicie sesion de nuevo`})
    }else if(error.name === 'JsonWebTokenError'){
        res.status(403).json({message: `Su token es invalido`})
    }else {
        res.status(500).json({message: `Error en el servidor`})
    }
  }
}