
export async function apikeyAutorization(req,res,next) {
  try {
    const apiKey = req.apikey
    
    if(!apiKey.permissions.includes('admin')) {
      return res.status(403).json({message: `Usted no esta autorizado`})
    }
    next()
  } catch (error) {
    console.log(`A ocurrido un error a la hora de autorizarce con la apikey`,error)
    res.status(500).json({message: `Error en el servidor`})
    
  }
}

