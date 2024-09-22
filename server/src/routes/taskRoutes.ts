import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

const router = Router();

router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, getTasks);
router.put('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);
export default router