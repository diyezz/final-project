import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    console.log(decoded)
    
    //@ts-ignore
    req.user = await User.findOne({ _id: decoded._id });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

export default authMiddleware;
