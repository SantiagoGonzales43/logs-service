import mongoose from "mongoose";

async function connectDb() {
    try {
        const url = 'mongodb://localhost:27017/logs_db';
        await mongoose.connect(url)
        console.log('conexion exitosa ala db')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDb