import User from "../models/user.mjs"; 
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()




export async function userRegister(req,res) {
  try {
    const {name,email,password} = req.body

    if(!name || !email || !password) {
      return res.status(404).json({message: `Faltan datos del usuario`})
    }

    const emailEncontrado = await User.findOne({email: email})
    
    if(emailEncontrado) {
      return res.status(401).json({message: `Credenciales invalidas`})
    }

    const nombreEncontrado = await User.findOne({name: name})
    
    if(nombreEncontrado) {
      return res.status(401).json({message: `Credenciales invalidas`})
    }

    const newUser = new User({
      name:name,
      email:email,
      password:password,
    })

    await newUser.save()

    res.status(201).json({message: `Usuario registrado correctamente`})
  } catch (error) {
    console.log(`Error al registrar el usuario`,error)
    res.status(500).json({message: `Error interno del servidor`})
  }
}



export async function userLogin(req,res) {
  try {
    
    const {email, password} = req.body
  
    if(!email || !password) {
      return res.status(400).json({message: `Faltan datos del usuario`})
    }
  
    const user = await User.findOne({email: email})
  
    if(!user) {
      return res.status(404).json({message: 'Credenciales invalidas'})
    }
    
    const isEqual = await user.comparePassword(password)
  
    if(!isEqual) {
      return res.status(403).json({message:`Credenciales invalidas`})
    }
  
    const secretKey = process.env.JWT_SECRET_KEY
  
    const playload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles
    }
  
    const token = jwt.sign(playload,secretKey, {expiresIn: '1h'})
  
    return res.status(200).json({
      message:`Usuario logeado exitosamente`,
      token: token
    })
  } catch (error) {
    console.log(`Error al logear usuario`,error)
    res.status(500).json({message:`Error interno del servidor`})
  }
}