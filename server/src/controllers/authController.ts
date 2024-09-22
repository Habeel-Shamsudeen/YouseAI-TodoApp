import { Request, Response, NextFunction } from "express";
import { loginSchema, signUpSchema } from "../models/validationSchemas";
import { getUserData, loginUser, registerUser } from "../services/authServices";
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

export const session = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserData(req.body.userId);
    res.json({
      user:{
        id:user?.id,
        email:user?.email,
        name:user?.name
      },
      tasks:user?.tasks,
      valid: true
    })
  } catch (error) {
    next(error)
  }
};

export const logout = (req:Request, res:Response) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
}