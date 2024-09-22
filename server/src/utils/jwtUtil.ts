import jwt from 'jsonwebtoken';
import { DecodedToken } from '../models/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = '12h';

/**
 * Function to generate a JWT token
 * @param userId - The ID of the user for whom the token is being generated
 * @returns A signed JWT token
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): DecodedToken => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      return decoded;
    } catch (error) {
      throw new Error("Failed to verify Token")
    }
  };
