import { Repository, getRepository } from 'typeorm';
import Class from '../entities/Class';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ICreateClassDTO from '@modules/classes/dtos/ICreateClassDTO';
import IFindClassByUserIdAndSubjectDTO from '@modules/classes/dtos/IFindClassByUserIdAndSubjectDTO';
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

  public async findClassByUserId(user_id: string): Promise<Class | undefined> {
    const searchedClass = await this.ormRepository.findOne({
      where: { user_id },
    });

    return searchedClass;
  }

  public async findClassByUserIdAndSubject({
    user_id,
    subject,
  }: IFindClassByUserIdAndSubjectDTO): Promise<Class | undefined> {
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
    if (
      (week_day && subject && time) ||
      (week_day && subject && time === 0) ||
      (week_day === 0 && subject && time) ||
      (week_day === 0 && subject && time === 0)
    ) {
      const classesWithSameSubject = await this.ormRepository.find({
        where: { subject },
        relations: ['user'],
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

    const classes = await this.ormRepository.find({
      relations: ['user'],
    });

    return classes;
  }

  public async save(selectedClass: Class) {
    return this.ormRepository.save(selectedClass);
  }
}
