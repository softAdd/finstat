import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findJwtUserByToken } from '../queries/jwt-users';

export const HAS_A_DATE_REGEXP = /([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)([0-9][0-9][0-9][0-9])/
export const ENDS_WITH_NUMBER_REGEXP = /-?(\d+\s)?\d+.\d+$/

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-very-secret-key';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.sendStatus(401) // if there isn't any token
  } 
  try {
    jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch (e) {
    res.sendStatus(403);
  }
}

export function getUserByToken(req: Request) {
  const token = req.headers['authorization']?.split(' ')[1] as string;
  return findJwtUserByToken(token);
}