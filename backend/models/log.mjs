import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  timestamp : {
    type: Date,
    default: Date.now,
    required: true
  },
  level: {
    type: String,
    required: true,
    message: `El nivel debe ser uno: 'DEBUG','INFO','WARNING','ERROR','FATAL'`,
    enum: ['DEBUG','INFO','WARNING','ERROR','FATAL']
  },
  message: {
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
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  source_type: {
    type: String,
    enum: ['user','apikey'],
    required:true
  },
  source_name: {
    type: String,
    required: true
  },
  transaction_id: {
    type: String,
    description: 'ID de la transacción o petición (para rastreo)'
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    description: 'Información adicional estructurada relacionada con el log (opcional)'
  },
  error: {
    name: String,
    message: String,
    stack: String
  }

})

const Log = mongoose.model('Log', logSchema, 'logs')

export default Log