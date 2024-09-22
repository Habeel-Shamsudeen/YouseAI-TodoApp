import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { verifyToken } from '../utils/jwtUtil';
import { DecodedToken } from '../models/types';

// Middleware to check for JWT token in cookies
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if the cookies exist
    if (!req.headers.cookie) {
      return res.status(401).json({ message: 'Authentication token not found' });
    }

    // Parse cookies from the request header
    const cookies = cookie.parse(req.headers.cookie);
    const brererToken = cookies.token;

    if (!brererToken || !brererToken.startsWith("Bearer")) {
      return res.status(401).json({ message: 'Authentication token not found' });
    }

    const token = brererToken.split("%")[1];

    // Verify the token using JWT
    const decoded : DecodedToken = verifyToken(token)
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
