import { Repository, getRepository, Cursor } from 'typeorm';
import Class from '../entities/Class';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ICreateClassDTO from '@modules/classes/dtos/ICreateClassDTO';
import IFindClassByUserIdDTO from '@modules/classes/dtos/IFindClassByUserIdDTO';
import IFindAllClassesDTO from '@modules/classes/dtos/IFindAllClassesDTO';

export default class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async create({
    subject,
    cost,
    user_id,
  }: ICreateClassDTO): Promise<Class> {
    const newClass = this.ormRepository.create({ subject, cost, user_id });

    await this.ormRepository.save(newClass);

    return newClass;
  }

  public async findClassByUserId({
    user_id,
    subject,
  }: IFindClassByUserIdDTO): Promise<Class | undefined> {
    const searchedClass = await this.ormRepository.findOne({
      where: { user_id, subject },
    });

    return searchedClass;
  }

  public async findAll({
    week_day,
    subject,
    time,
  }: IFindAllClassesDTO): Promise<Class[]> {
    if ((week_day && subject && time) || (week_day && subject && time === 0)) {
      const classesWithSameSubject = await this.ormRepository.find({
        where: { subject },
      });

      const filteredClasses = new Set(
        classesWithSameSubject.filter(classItem => {
          return classItem.schedules
            .map(schedule => {
              return (
                schedule.week_day === week_day &&
                schedule.from <= time &&
                schedule.to > time
              );
            })
            .includes(true);
        }),
      );

      const filteredClassesInArrayType = Array.from(filteredClasses);

      return filteredClassesInArrayType;
    }

    const classes = await this.ormRepository.find();

    return classes;
  }
}
