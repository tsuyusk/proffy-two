import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid Email/password');
    }

    const passwordMatches = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new AppError('Invalid Email/password');
    }

    const {
      jwt: { secret, expiresIn },
    } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
