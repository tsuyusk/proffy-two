import { getRepository, Repository } from 'typeorm';
import Connection from '../entities/Connection';
import ICreateConnectionDTO from '@modules/connections/dtos/ICreateConnectionDTO';
import IConnectionsRepository from '../../../repositories/IConnectionsRepository';

class ConnectionsRepository implements IConnectionsRepository {
  private ormRepository: Repository<Connection>;
  constructor() {
    this.ormRepository = getRepository(Connection);
  }

  public async create({ user_id }: ICreateConnectionDTO) {
    const newConnection = this.ormRepository.create({
      user_id,
    });

    return this.ormRepository.save(newConnection);
  }

  public async getTotalFromUserId(user_id: string) {
    const allConnectionsFromUser = await this.ormRepository.find({
      where: { user_id },
    });

    return allConnectionsFromUser.length;
  }

  public async getTotal() {
    const allConnections = await this.ormRepository.find();

    return allConnections.length;
  }
}

export default ConnectionsRepository;
