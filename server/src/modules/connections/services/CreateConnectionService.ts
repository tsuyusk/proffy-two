import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConnectionsRepository from '../repositories/IConnectionsRepository';
import ICreateConnectionDTO from '../dtos/ICreateConnectionDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest extends ICreateConnectionDTO {}

@injectable()
class CreateConnectionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ConnectionsRepository')
    private connectionsRepository: IConnectionsRepository,
  ) {}

  public async execute({ user_id }: IRequest) {
    const chosenUser = await this.usersRepository.findById(user_id);

    if (!chosenUser) {
      throw new AppError('User not found');
    }

    const newConnection = await this.connectionsRepository.create({
      user_id: chosenUser.id,
    });

    return newConnection;
  }
}

export default CreateConnectionService;
