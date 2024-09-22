import { Request, Response, NextFunction } from 'express';

// Global error handler middleware
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  console.error(err);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default globalErrorHandler;
