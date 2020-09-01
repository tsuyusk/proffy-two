import multer from 'multer';
import { Router } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', async (request, response) => {
  const { name, lastName, email, bio, whatsapp } = request.body;

  const { id: user_id } = request.user;

  const updateProfile = container.resolve(UpdateProfileService);

  const user = await updateProfile.execute({
    user_id,
    name,
    lastName,
    email,
    bio,
    whatsapp,
  });

  return response.json(classToClass(user));
});

profileRouter.get('/me', async (request, response) => {
  const { id: user_id } = request.user;

  const showProfile = container.resolve(ShowProfileService);

  const user = await showProfile.execute({ user_id });

  response.json(classToClass(user));
});

profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    const { filename } = request.file;
    const { id: user_id } = request.user;

    const updateAvatar = container.resolve(UpdateAvatarService);

    const userWithUpdatedAvatar = await updateAvatar.execute({
      user_id,
      avatar: filename,
    });

    response.json(classToClass(userWithUpdatedAvatar));
  },
);

export default profileRouter;
