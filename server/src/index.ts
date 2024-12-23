import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Connect Database
connectDB();

// Routes
app.use('/api', userRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});