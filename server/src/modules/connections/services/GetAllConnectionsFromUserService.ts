import { injectable, inject } from 'tsyringe';

import IConnectionsRepository from '../repositories/IConnectionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class GetAllConnectionsFromUserRepository {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ConnectionsRepository')
    private connectionsRepository: IConnectionsRepository,
  ) {}

  public async execute({ user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const allConnections = await this.connectionsRepository.getTotalFromUserId(
      user.id,
    );

    return allConnections;
  }
}

export default GetAllConnectionsFromUserRepository;
