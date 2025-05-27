export async function userAuthorization(req,res,next) {
  try {
    if(!req.user.roles.includes('admin')) {
      return res.status(403).json({message: `Usted no esta autorizado`})
    }
    next()
  } catch (error) {
    console.log(`Error al intentar autorizar al usuario`,error)
    res.status(500).json({message:`Error interno en el servidor`})
  }
}