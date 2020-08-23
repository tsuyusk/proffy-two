import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';

import appRouter from './routes';
import AppError from '@shared/errors/AppError';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(appRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return response.json({ status: 'error', message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server listening on *:${port}`);
});
