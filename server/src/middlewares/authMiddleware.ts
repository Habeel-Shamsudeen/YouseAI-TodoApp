import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { verifyToken } from '../utils/jwtUtil';
import { DecodedToken } from '../models/types';

// Middleware to check for JWT token in cookies
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No Authorization header provided' });
    }

    const bearerToken = authHeader;
    if (!bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'Invalid Authorization header format' });
    }
  
    const token = bearerToken.split(" ")[1];

    // Verify the token using JWT
    const decoded : DecodedToken = verifyToken(token)
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
