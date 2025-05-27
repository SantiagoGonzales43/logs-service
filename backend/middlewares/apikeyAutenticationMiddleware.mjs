import ApiKey from "../models/apikey.mjs"


export async function apikeyAutentication(req, res, next) {
  try {
    const providedApiKey = req.headers['x-api-key']
  
    if(!providedApiKey) {
     return res.status(401).json({message: `ApiKey no proporcionada`})
    }

    const parts = providedApiKey.split('_',2)

    if(parts.length !== 2) {
      return res.status(401).json({message: `Formato de apiKey invalido`})
    }

    const apiKeyId = parts[0]
    const providedSecretPart = parts[1] 

    const apiKeyDb = await ApiKey.findById(apiKeyId)

    if(!apiKeyDb || !apiKeyDb.isActive) {
      return res.status(403).json({message: `ApiKey invalida o inactiva`})
    }

    const isEqual = await apiKeyDb.compareApiKeys(providedSecretPart)

    if(!isEqual) {
      return req.status(403).json({message: `ApiKey invalida`})
    }

    req.apikey = apiKeyDb
    next() 
  } catch (error) {
    console.log(`A ocurrido un error en el middleware de autenticacion por apiKye`,error)
    res.status(500).json({message: `Error en el servidor`})
  }
}