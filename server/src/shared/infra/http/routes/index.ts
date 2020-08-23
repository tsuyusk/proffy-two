import { Router } from 'express';

import userRouter from '@modules/users/infra/https/routes/user.routes';
import profileRouter from '@modules/users/infra/https/routes/profile.routes';
import sessionRouter from '@modules/users/infra/https/routes/session.routes';

const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/profile', profileRouter);
appRouter.use('/sessions', sessionRouter);

export default appRouter;
