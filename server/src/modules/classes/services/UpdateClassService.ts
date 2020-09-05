import { inject, injectable } from 'tsyringe';
import { isBefore } from 'date-fns';
import IClassesRepository from '../repositories/IClassesRepository';
import AppError from '@shared/errors/AppError';
import IClassSchedulesRepository from '../repositories/IClassSchedulesRepository';
import convertHoursToMinutes from '@shared/utils/convertHoursToMinutes';
import verifySubject from '@shared/utils/verifySubject';
import Class from '../infra/typeorm/entities/Class';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  cost: number;
  subject: string;
  schedule: Array<{
    week_day: number;
    from: string;
    to: string;
  }>;
}

@injectable()
class UpdateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
    @inject('ClassSchedulesRepository')
    private classSchedulesRepository: IClassSchedulesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ subject, cost, schedule, user_id }: IRequest) {
    const selectedUser = await this.usersRepository.findById(user_id);

    if (!selectedUser) {
      throw new AppError('User not found');
    }

    let selectedClass: Class | undefined;

    selectedClass = await this.classesRepository.findClassByUserId(user_id);

    if (!selectedClass) {
      selectedClass = await this.classesRepository.create({
        cost,
        subject,
        user_id,
      });
    }

    verifySubject(subject);

    selectedClass.cost = cost;
    selectedClass.subject = subject;

    await this.classesRepository.save(selectedClass);

    const allSchedulesFromClass = await this.classSchedulesRepository.findAllByClassId(
      selectedClass.id,
    );

    const updateSchedulePromises = schedule.map(async (scheduleItem, index) => {
      const { from, to, week_day } = scheduleItem;

      const fromInMinutes = convertHoursToMinutes(from);
      const toInMinutes = convertHoursToMinutes(to);

      const fromScheduleDate = new Date().setMinutes(fromInMinutes);
      const toScheduleDate = new Date().setMinutes(toInMinutes);

      if (isBefore(toScheduleDate, fromScheduleDate)) {
        throw new AppError('Invalid schedule');
      }

      const currentStoragedItem = allSchedulesFromClass[index];
      if (!currentStoragedItem) {
        const newSchedule = await this.classSchedulesRepository.create({
          from: convertHoursToMinutes(scheduleItem.from),
          to: convertHoursToMinutes(scheduleItem.to),
          week_day: scheduleItem.week_day,
          class_id: selectedClass?.id || '',
        });
        return newSchedule;
      }

      currentStoragedItem.from = fromInMinutes;
      currentStoragedItem.to = toInMinutes;
      currentStoragedItem.week_day = week_day;

      return this.classSchedulesRepository.save(currentStoragedItem);
    });

    const updatedSchedules = await Promise.all(updateSchedulePromises);

    selectedClass.schedules = updatedSchedules;

    return selectedClass;
  }
}
export default UpdateClassService;
