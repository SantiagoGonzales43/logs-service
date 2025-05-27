import Log from "../models/log.mjs";

export async function getLogs(req, res) {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al obtener logs',error
    })
  }
}

export async function postLogs(req, res) {
  try {
    let resource_id;
    let resource_type;
    let resource_name;

    if(req.user && req.user.id) {
      resource_id = req.user.id;
      resource_type = 'user';
      resource_name = req.user.name || 'usuario deconocido'
    }else if(req.apikey && req.apikey._id) {
      resource_id = req.apikey._id;
      resource_type = 'apikey'
      resource_name = req.apikey.name
    }else {
      return res.status(401).json({messgae: `No autenticado o no se pudo detectar el origen del log`})
    }

    const {
      level,
      message,
      origen,
      transaction_id,
      details,
      error: errorDetails,
    } = req.body;
  
    const newLog = new Log({
      level,
      message,
      origen,
      source_id : resource_id,
      source_type : resource_type,
      source_name: resource_name,
      transaction_id,
      details,
      error: errorDetails,
    });

    
  
    const insercion = await newLog.save();
    res.status(201).json({
      message : `Log posteado con exito`,
      log: insercion
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      mensaje: `Error al enviar el log`,
      error: error
    })
  }
}



export async function getLogsId(req,res) {
  try {
    const id = req.params.id

    if(!id) {
      return res.status(400).json({message:`Falta el id del usuario o servidor`})
    }

    const logs = await Log.find({source_id: id})

    if(!logs) {
      res.status(403).json({message: `No hay logs del usuario o servidor`})
    }

    res.status(200).json(logs)
  } catch (error) {
    console.log(`Error en getLogId`,error)
    res.status(500).json({message:`Error interno en el servidor`})
  }
}