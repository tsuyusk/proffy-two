import { Repository, getRepository } from 'typeorm';

import IClassSchedulesRepository from '@modules/classes/repositories/IClassSchedulesRepository';
import ClassSchedule from '../entities/ClassSchedule';
import ICreateClassSchedule from '@modules/classes/dtos/ICreateClassScheduleDTO';

class ClassSchedulesRepository implements IClassSchedulesRepository {
  private ormRepository: Repository<ClassSchedule>;

  constructor() {
    this.ormRepository = getRepository(ClassSchedule);
  }

  public async create({
    class_id,
    from,
    to,
    week_day,
  }: ICreateClassSchedule): Promise<ClassSchedule> {
    const classSchedule = this.ormRepository.create({
      class_id,
      from,
      to,
      week_day,
    });

    await this.ormRepository.save(classSchedule);

    return classSchedule;
  }
}

export default ClassSchedulesRepository;
