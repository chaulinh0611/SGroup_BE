import { MongoClient } from "mongodb"
import "dotenv/config"
import mongoose from 'mongoose';

let dbInstance = null
const client = new MongoClient(process.env.MONGODB_URL)

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/backend_basic');

  } catch (err) {
    console.error('Lỗi kết nối MongoDB:', err.message);
    throw err;
  }
};

const getDB = () => {
    if (!dbInstance) {
        throw new Error("Database not initialize. Call connectDB first.")
    }
    return dbInstance
}
export { connectDB, getDB }
