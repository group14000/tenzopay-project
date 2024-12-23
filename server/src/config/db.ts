import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.error('MongoDB URI is not defined in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, 
        } as ConnectOptions);
        console.log('MongoDB connected');
    } catch (error: unknown) {
        if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
            console.error('Error: Unable to connect to MongoDB. Please ensure MongoDB is running and accessible.');
        } else {
            console.error('Error connecting to MongoDB:', error);
        }
        process.exit(1);
    }
};

export default connectDB;
