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

  public async saveMultiple(classSchedules: ClassSchedule[]) {
    const insertSchedulesIntoDatabasePromises = classSchedules.map(
      async classSchedule => {
        return this.ormRepository.save(classSchedule);
      },
    );

    const insertedSchedules = await Promise.all(
      insertSchedulesIntoDatabasePromises,
    );

    return insertedSchedules;
  }

  public async save(classSchedule: ClassSchedule) {
    return this.ormRepository.save(classSchedule);
  }

  public async findAllByClassId(class_id: string) {
    const selectedClassSchedule = await this.ormRepository.find({
      where: { class_id },
    });

    return selectedClassSchedule;
  }
}

export default ClassSchedulesRepository;
