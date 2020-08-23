import { Router } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const userAndToken = await authenticateUser.execute({ email, password });

  return response.json(classToClass(userAndToken));
});

export default sessionRouter;
