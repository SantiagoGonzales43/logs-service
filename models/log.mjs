
import mongoose from "mongoose";



const logSchema = new mongoose.Schema({
  timestamp : {
    type: Date,
    default: Date.now,
    required: true
  },
  nivel: {
    enum: ['WARNING']
  }

})