import { Router } from 'express';
import { container } from 'tsyringe';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateClassService from '@modules/classes/services/CreateClassService';
import CreateClassScheduleService from '@modules/classes/services/CreateClassScheduleService';
import { classToClass } from 'class-transformer';
import FindAllClassesService from '@modules/classes/services/FindAllClassesService';
import convertHoursToMinutes from '@shared/utils/convertHoursToMinutes';

const classesRouter = Router();

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

classesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { subject, cost, schedule } = request.body;
  const user_id = request.user.id;

  const createClass = container.resolve(CreateClassService);

  const newClass = await createClass.execute({
    cost,
    subject,
    user_id,
  });

  const classSchedule = schedule as Schedule[];

  const createClassSchedule = container.resolve(CreateClassScheduleService);

  const schedules = await createClassSchedule.execute({
    class_id: newClass.id,
    schedules: classSchedule,
  });

  return response.json(
    classToClass({
      class: newClass,
      schedule: schedules,
    }),
  );
});

classesRouter.get('/', async (request, response) => {
  const { week_day, subject, time } = request.query;
  const findAllClasses = container.resolve(FindAllClassesService);

  const classes = await findAllClasses.execute({
    week_day: Number(week_day),
    subject: String(subject),
    time: convertHoursToMinutes(String(time)),
  });

  return response.json(classToClass(classes));
});

export default classesRouter;
