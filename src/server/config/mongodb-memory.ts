import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    
    // Add sample data for testing
    await initializeSampleData();
    
    console.log('Connected to in-memory MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

async function initializeSampleData() {
  // Add sample data here if needed
  // This is useful for testing and development
}

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
    console.log('Disconnected from in-memory MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    process.exit(1);
  }
};