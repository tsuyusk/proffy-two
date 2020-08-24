import ClassSchedule from '../infra/typeorm/entities/ClassSchedule';
import ICreateClassSchedule from '../dtos/ICreateClassScheduleDTO';

export default interface IClassSchedulesRepository {
  create(data: ICreateClassSchedule): Promise<ClassSchedule>;
}
