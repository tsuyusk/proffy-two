import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  lastName: string;
  email: string;
  bio: string;
  whatsapp: number;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    lastName,
    email,
    bio,
    whatsapp,
    password,
    oldPassword,
  }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const hasUserWithNewEmail = await this.usersRepository.findByEmail(email);

    if (hasUserWithNewEmail && hasUserWithNewEmail.id !== user.id) {
      throw new AppError('Email already taken');
    }

    if (password && !oldPassword) {
      throw new AppError('Missing old password');
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compare(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Invalid old password');
      }

      user.password = await this.hashProvider.generate(password);
    }

    user.name = name;
    user.email = email;
    user.bio = bio;
    user.whatsapp = whatsapp;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
