import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod'; // optional if you're using Zod

export const submissionValidator = (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Invalid request params received',
        data: {},
        error: error,
      });
      return; 
    }
  };
