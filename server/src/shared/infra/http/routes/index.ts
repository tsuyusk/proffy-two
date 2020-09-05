import { Router } from 'express';

import userRouter from '@modules/users/infra/https/routes/user.routes';
import profileRouter from '@modules/users/infra/https/routes/profile.routes';
import sessionRouter from '@modules/users/infra/https/routes/session.routes';
import classesRouter from '@modules/classes/infra/http/classes.routes';
import connectionRouter from '@modules/connections/infra/http/routes/connection.routes';

const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/profile', profileRouter);
appRouter.use('/sessions', sessionRouter);
appRouter.use('/classes', classesRouter);
appRouter.use('/connections', connectionRouter);

export default appRouter;
