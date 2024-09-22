import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { User } from "../models/types";
import { generateToken } from "../utils/jwtUtil";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  // check if user email already exist
  const existingUser: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  //hash the password before storing in Database
  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser: User = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const token = generateToken(newUser.id);
  const bearerToken = "Bearer "+token

  return bearerToken;
};

export const loginUser = async (email: string, password: string) => {
  // find the user with the given email
  const user: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User with this email do not exists.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  // if there is mismatch in the email password pair throw error
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  const token = generateToken(user.id);
  const bearerToken = "Bearer "+token

  return bearerToken;
};

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tasks: true,
      _count: false, // Optional: If you don't want counts
    },
  });

  if (user) {
    return {
      email: user.email,
      name: user.name,
      tasks: user.tasks,
    };
  }

  return null; // Return null if the user is not found
};


