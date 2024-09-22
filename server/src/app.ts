import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes'
import globalErrorHandler from './utils/errorHandler';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', taskRoutes); // Task routes

// Global error handler
app.use(globalErrorHandler);

export default app;
