import mongoose from 'mongoose';

let isConnected = false;
let connectionError = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>') || uri.includes('your-mongodb-cluster-url')) {
    const warnMsg = 'MongoDB URI not configured or has placeholders. Please set MONGODB_URI in your .env file with your MongoDB Atlas Cluster URL.';
    console.warn('\x1b[33m%s\x1b[0m', `[MongoDB Warning] ${warnMsg}`);
    connectionError = warnMsg;
    isConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    connectionError = null;
    console.log('\x1b[32m%s\x1b[0m', `[MongoDB Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
    return true;
  } catch (error) {
    connectionError = error.message;
    isConnected = false;
    console.error('\x1b[31m%s\x1b[0m', `[MongoDB Connection Error] ${error.message}`);
    return false;
  }
};

export const getMongoStatus = () => {
  const readyState = mongoose.connection.readyState;
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  
  return {
    connected: readyState === 1,
    status: states[readyState] || 'disconnected',
    host: mongoose.connection.host || null,
    dbName: mongoose.connection.name || null,
    error: connectionError,
    timestamp: new Date().toISOString()
  };
};

export default connectDB;
