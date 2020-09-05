import Connection from '../infra/typeorm/entities/Connection';
import ICreateConnectionDTO from '../dtos/ICreateConnectionDTO';

export default interface IConnectionsRepository {
  getTotal(): Promise<number>;
  getTotalFromUserId(user_id: string): Promise<number>;
  create(data: ICreateConnectionDTO): Promise<Connection>;
}
