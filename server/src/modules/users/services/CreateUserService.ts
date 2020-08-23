import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest extends ICreateUsersDTO {}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, lastName, email, password }: IRequest) {
    const hasUserWithSameName = await this.usersRepository.findByEmail(email);

    if (hasUserWithSameName) {
      throw new AppError('Email already taken');
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
