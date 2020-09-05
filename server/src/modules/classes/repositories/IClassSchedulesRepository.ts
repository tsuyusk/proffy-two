import ClassSchedule from '../infra/typeorm/entities/ClassSchedule';
import ICreateClassSchedule from '../dtos/ICreateClassScheduleDTO';

export default interface IClassSchedulesRepository {
  create(data: ICreateClassSchedule): Promise<ClassSchedule>;
  save(classSchedule: ClassSchedule): Promise<ClassSchedule>;
  saveMultiple(classSchedules: ClassSchedule[]): Promise<ClassSchedule[]>;
  findAllByClassId(class_id: string): Promise<ClassSchedule[]>;
}
