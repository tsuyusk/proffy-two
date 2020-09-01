import { injectable, inject } from 'tsyringe';
import IClassSchedulesRepository from '../repositories/IClassSchedulesRepository';
import ICreateClassScheduleDTO from '../dtos/ICreateClassScheduleDTO';
import convertHoursToMinutes from '@shared/utils/convertHoursToMinutes';

interface IRequest {
  class_id: string;
  schedules: Schedule[];
}

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

@injectable()
class CreateClassScheduleService {
  constructor(
    @inject('ClassSchedulesRepository')
    private classSchedulesRepository: IClassSchedulesRepository,
  ) {}

  public async execute({ class_id, schedules }: IRequest) {
    const insertScheduleIntoDatabasePromises = schedules.map(async schedule => {
      return await this.classSchedulesRepository.create({
        class_id,
        from: convertHoursToMinutes(schedule.from),
        to: convertHoursToMinutes(schedule.to),
        week_day: schedule.week_day,
      });
    });

    const newSchedules = await Promise.all(insertScheduleIntoDatabasePromises);

    return newSchedules;
  }
}
export default CreateClassScheduleService;
