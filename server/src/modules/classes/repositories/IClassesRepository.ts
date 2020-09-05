import ICreateClassDTO from '../dtos/ICreateClassDTO';
import Class from '../infra/typeorm/entities/Class';
import IfindClassByUserIdAndSubjectDTO from '../dtos/IFindClassByUserIdAndSubjectDTO';
import IFindAllClassesDTO from '../dtos/IFindAllClassesDTO';

export default interface IClassesRepository {
  create(data: ICreateClassDTO): Promise<Class>;
  findClassByUserIdAndSubject(
    data: IfindClassByUserIdAndSubjectDTO,
  ): Promise<Class | undefined>;
  findAll(data: IFindAllClassesDTO): Promise<Class[]>;
  save(selectedClass: Class): Promise<Class>;
  findClassByUserId(user_id: string): Promise<Class | undefined>;
}
