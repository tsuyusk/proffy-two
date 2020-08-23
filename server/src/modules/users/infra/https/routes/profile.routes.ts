import { Router } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', async (request, response) => {
  const {
    name,
    lastName,
    email,
    bio,
    whatsapp,
    oldPassword,
    password,
  } = request.body;

  const user_id = request.user.id;

  const updateProfile = container.resolve(UpdateProfileService);

  const user = await updateProfile.execute({
    user_id,
    name,
    lastName,
    email,
    bio,
    whatsapp,
    ...(password ? { password } : {}),
    ...(oldPassword ? { oldPassword } : {}),
  });

  return response.json(classToClass(user));
});

export default profileRouter;
