import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const apiKeySchema = new mongoose.Schema({
  apiKeyHash:{
    type: String,
    required:true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: ['user'],
    enum: ['user','admin']
  },
  isActive: {
    type:Boolean,
    default: true,
    required: true
  },
  createdAt: {
    type: Date,
    default : Date.now
  },
  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User', 
  required: false 
},
})

apiKeySchema.methods.compareApiKeys = async function (apyKeyToCompare) {
  const isEqual = await bcrypt.compare(apyKeyToCompare, this.apiKeyHash)
  return isEqual
}

const ApiKey = mongoose.model('Apikey', apiKeySchema, 'apikeys')

export default ApiKey