import { Router } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { name, lastName, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    lastName,
    email,
    password,
  });

  return response.json(classToClass(user));
});

export default userRouter;
