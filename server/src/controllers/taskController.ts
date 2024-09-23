import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskServices"; // Import taskService
import { Task } from "@prisma/client";

// Create a new task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, status, priority, dueDate } = req.body.taskData;
  const userId: string = req.body.userId;
  try {
    const newTask = await taskService.createTask(
      title,
      description,
      status,
      priority,
      dueDate,
      userId
    );
    res.status(201).json({
      message: "Successfully created tasks",
      newTask,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks for a user
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.userId;

  try {
    const tasks: Task[] = await taskService.getTasks(userId);
    res.status(200).json({
      message: "Successfully fetched user tasks",
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Update a task by ID
export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params; // Get task ID from route parameters
    const { title, description, status, priority, dueDate } = req.body;
    const userId: string = req.body.userId; // Get user ID from the request body
  
    try {
      const updatedTask = await taskService.updateTask(
        id,
        title,
        description,
        status,
        priority,
        dueDate,
        userId
      );
  
      res.status(200).json({
        message: 'Successfully updated task',
        updatedTask,
      });
    } catch (error) {
      next(error);
    }
  };
  
  // Delete a task by ID
  export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const userId: string = req.body.userId;
  
    try {
      await taskService.deleteTask(id,userId);
      res.status(204).json({
        message: 'Successfully deleted task',
      });
    } catch (error) {
      next(error);
    }
  };
