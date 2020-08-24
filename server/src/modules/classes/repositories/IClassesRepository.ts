import ICreateClassDTO from '../dtos/ICreateClassDTO';
import Class from '../infra/typeorm/entities/Class';
import IFindClassByUserIdDTO from '../dtos/IFindClassByUserIdDTO';
import IFindAllClassesDTO from '../dtos/IFindAllClassesDTO';

export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  findClassByUserId(data: IFindClassByUserIdDTO): Promise<Class | undefined>;
  findAll(data: IFindAllClassesDTO): Promise<Class[]>;
}
