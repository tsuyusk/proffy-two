import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    lastName,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      lastName,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
