import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

declare module 'express-serve-static-core' {
    interface Request {
      role?: string;
      userId?: string;
    }
  }

const isAdmin = (req: any, res: Response, next: NextFunction) => {
    const userRole = req?.role; // Get the user's role from the request

  // Check if the user is an examiner
  if (userRole === 'ADMIN') {
    // If the user is an examiner, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not an examiner, deny access
    res.status(403).json({ message: 'Access denied. Only examiners are allowed.' });
  }
}

const isStudent = (req: any, res: Response, next: NextFunction) => {
  const userRole = req?.role; // Get the user's role from the request

  // Check if the user is an examiner
  if (userRole === 'STUDENT') {
    // If the user is an examiner, proceed to the next middleware or route handler
    next();
  } else {
    // If the user is not an examiner, deny access
    res.status(403).json({ message: 'Access denied. Only Students are allowed.' });
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).send('Access Denied');

      return;
    }

    try {
        const secret = process.env.JWT_SECRET
        if(!secret) {
            res.status(404).json({
                message: 'Jwt secret not found'
            })
        }else {
          const verified = jwt.verify(token, secret);
          req.role = (verified as jwt.JwtPayload)?.role
          req.userId = (verified as jwt.JwtPayload)?.userId
            next();
        }
    } catch (err) {
      res.status(400).send('Invalid Token');
      console.log(err)
    }
  };

export {
    isAdmin,
    isStudent,
    verifyToken
}
