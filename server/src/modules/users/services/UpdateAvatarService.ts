import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatar }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!avatar) {
      throw new AppError('Missing avatar');
    }

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.avatar = avatar;

    return this.usersRepository.save(user);
  }
}

export default UpdateAvatarService;
