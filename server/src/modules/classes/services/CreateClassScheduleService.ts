import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IClassSchedulesRepository from '../repositories/IClassSchedulesRepository';
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
      const { from, to, week_day } = schedule;

      const fromInMinutes = convertHoursToMinutes(from);
      const toInMinutes = convertHoursToMinutes(to);

      const fromScheduleDate = new Date().setMinutes(fromInMinutes);
      const toScheduleDate = new Date().setMinutes(toInMinutes);

      if (isBefore(toScheduleDate, fromScheduleDate)) {
        throw new AppError('Invalid schedule');
      }

      return this.classSchedulesRepository.create({
        class_id,
        from: fromInMinutes,
        to: toInMinutes,
        week_day: week_day,
      });
    });

    const newSchedules = await Promise.all(insertScheduleIntoDatabasePromises);

    return newSchedules;
  }
}
export default CreateClassScheduleService;
