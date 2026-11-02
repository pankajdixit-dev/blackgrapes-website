import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blackgrapes';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    });
    console.log(`✅ [MongoDB] Connected Successfully to Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️ [MongoDB Connection Notice]: ${error.message}`);
    console.log(`💡 [Tip for Beginner]: Make sure MongoDB Atlas connection string is provided in backend/.env (MONGO_URI)`);
    return false;
  }
};

