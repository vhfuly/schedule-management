import express, { Request, Response, NextFunction } from 'express';

import { routes } from './shared/routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request:Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error: ${err.message}`,
  })
});

export { app };
