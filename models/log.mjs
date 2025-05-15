import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  timestamp : {
    type: Date,
    default: Date.now,
    required: true
  },
  nivel: {
    type: String,
    required: true,
    message: `El nivel debe ser uno: 'DEBUG','INFO','WARNING','ERROR','FATAL'`,
    enum: ['DEBUG','INFO','WARNING','ERROR','FATAL']
  },
  mensaje: {
    type: String,
    required: true,
    minLength: 1,
    message: `El mensaje de log es obligatorio`
  },
  origen: {
    type: String,
    default: 'system',
    description: 'Indica el componente o servicio que generó el log'
  },
  usuario_id: {
    type: String,
    description: 'ID del usuario asociado con la acción (si aplica)'
  },
  transaccion_id: {
    type: String,
    description: 'ID de la transacción o petición (para rastreo)'
  },
  detalles: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Información adicional estructurada relacionada con el log (opcional)'
  },
  error: {
    type: mongoose.Schema({
      name: String,
      message: String,
      stack: String
    }),
    description: 'Objeto que contiene detalles del error (si el nivel es ERROR o FATAL)'
  }

})

const Log = mongoose.model('Log', logSchema, 'logs')

export default Log