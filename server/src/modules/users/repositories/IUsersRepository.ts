import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
