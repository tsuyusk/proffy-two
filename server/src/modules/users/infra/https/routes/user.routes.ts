import { Router } from 'express';
import { classToClass } from 'class-transformer';
import { celebrate, Joi, Segments } from 'celebrate';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).max(30).required(),
      lastName: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  async (request, response) => {
    const { name, lastName, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      lastName,
      email,
      password,
    });

    return response.json(classToClass(user));
  },
);

export default userRouter;
