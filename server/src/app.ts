import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import globalErrorHandler from "./utils/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://habeelstodoapp.vercel.app", // Replace with your frontend URL ideally should be an env
    credentials: true, // Allow cookies to be sent
  })
); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", taskRoutes); // Task routes

// Global error handler
app.use(globalErrorHandler);

export default app;
