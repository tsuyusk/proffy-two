import { injectable, inject } from 'tsyringe';

import IConnectionsRepository from '../repositories/IConnectionsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class GetAllConnectionsRepository {
  constructor(
    @inject('ConnectionsRepository')
    private connectionsRepository: IConnectionsRepository,
  ) {}

  public async execute() {
    const allConnections = await this.connectionsRepository.getTotal();

    return allConnections;
  }
}

export default GetAllConnectionsRepository;
