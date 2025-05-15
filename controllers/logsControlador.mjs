import Log from "../models/log.mjs";

export async function getLogs(req, res) {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: 'Error al obtener logs', 
      error
    })
  }
}

export async function postLogs(req, res) {
  try {
    const {
      nivel,
      mensaje,
      origen,
      usuario_id,
      transaccion_id,
      detalles,
      error,
    } = req.body;
  
    const nuevoLog = new Log({
      nivel,
      mensaje,
      origen,
      usuario_id,
      transaccion_id,
      detalles,
      error,
    });
  
    const insercion = await nuevoLog.save();
    res.json(insercion)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensaje: `Error al enviar el log`,
      error: error
    })
  }
}
