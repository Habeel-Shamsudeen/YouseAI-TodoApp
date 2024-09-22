import { Task, Status, Priority } from '@prisma/client'; // Adjust imports based on your setup
import prisma from '../config/db';

// Create a new task
export const createTask = async (title: string, description: string | null, status: Status, priority: Priority, dueDate: Date | null, userId: string): Promise<Task> => {
  try {
    const newTask : Task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        user: { connect: { id: userId } }, // Associate task with user
      },
    });
    return newTask;
  } catch (error) {
    throw new Error('Error creating task: ' + error);
  }
};

// Get all tasks for a user
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
    });
    return tasks;
  } catch (error) {
    throw new Error('Error fetching tasks: ' + error);
  }
};

// Update a task by ID
export const updateTask = async (id: string, title: string, description: string | null, status: Status, priority: Priority, dueDate: Date | null, userId:string): Promise<Task> => {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
        throw new Error('Task not found' );
    }

    // Check if the user is authorized to update the task
    if (task.userId !== userId) {
      throw new Error('Unauthorized to update this task');
    }
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
      },
    });
    return updatedTask;
  } catch (error) {
    throw new Error('Error updating task: ' + error);
  }
};

// Delete a task by ID
export const deleteTask = async (id: string, userId:string): Promise<void> => {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
        throw new Error('Task not found' );
    }
    if (task.userId !== userId) {
      throw new Error('Unauthorized to delete this task');
    }
    await prisma.task.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Error deleting task: ' + error);
  }
};
