import bcrypt from 'bcrypt'
import crypto from 'crypto'
import ApiKey from '../models/apikey.mjs'

export async function createApiKey(req,res) {
  try {
    const {name,permissions} = req.body

    if(!name) {
      return res.status(400).json({message: `Falta el nombre de la apiKey`})
    }


    const textApiKey = crypto.randomBytes(32).toString('hex')

    const apiKeyHashed = await bcrypt.hash(textApiKey,12) 

    const apiKey = new ApiKey({
      apiKeyHash: apiKeyHashed,
      name:name,
      permissions:permissions
    })

    const apiKeySave = await apiKey.save()

    const fullClientApiKey = `${apiKeySave._id}_${textApiKey}`

    res.status(201).json({
      message: `ApiKey creada con exito`,
      publicId: apiKeySave._id,
      apiKey: fullClientApiKey,
      name: apiKeySave.name,
      permissions: apiKeySave.permissions
    })
  } catch (error) {
    console.log(`A ocurrido un error en createApiKey`,error)
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Ya existe una API Key con ese nombre o hash.',
        details: error.message,
      });
    }
    res.status(500).json({message: `Error interno del servidor`})
  }
}