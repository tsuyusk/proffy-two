import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  lastName: string;
  email: string;
  bio: string;
  whatsapp: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    lastName,
    email,
    bio,
    whatsapp,
  }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const hasUserWithNewEmail = await this.usersRepository.findByEmail(email);

    if (hasUserWithNewEmail && hasUserWithNewEmail.id !== user.id) {
      throw new AppError('Email already taken');
    }

    if (bio.length > 300) {
      throw new AppError('Biography too long');
    }

    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.bio = bio;
    user.whatsapp = whatsapp;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
