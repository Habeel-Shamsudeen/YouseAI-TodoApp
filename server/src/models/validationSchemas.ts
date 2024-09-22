// src/validation/validationSchemas.ts

import { z } from "zod";
import { Priority } from "./types";

// Zod schema for user signup
export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  name:z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Zod schema for creating a task
export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH]),
  dueDate: z.string().optional(),
});
