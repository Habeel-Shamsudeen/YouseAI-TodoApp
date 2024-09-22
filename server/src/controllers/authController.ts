import { Request, Response, NextFunction } from "express";
import { loginSchema, signUpSchema } from "../models/validationSchemas";
import { loginUser, registerUser } from "../services/authServices";
import { User } from "../models/types";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: User = req.body;
    const validate = signUpSchema.safeParse(data); // Validate request body using Zod schema
    if (!validate.success) {
      return res.status(411).json({
        message: "Validation Error",
        error: validate.error.issues.map((issue) => issue.message),
      });
    }
    const token: string = await registerUser(
      data.email,
      data.password,
      data.name
    );
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const validate = loginSchema.safeParse(data);
    if (!validate.success) {
      return res.status(411).json({
        message: "Validation Error",
        error: validate.error.issues.map((issue) => issue.message),
      });
    }
    const token = await loginUser(data.email, data.password);
    res
      .status(201)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    next(error);
  }
};
