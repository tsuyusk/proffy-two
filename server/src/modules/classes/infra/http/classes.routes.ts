import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateClassService from '@modules/classes/services/CreateClassService';
import CreateClassScheduleService from '@modules/classes/services/CreateClassScheduleService';
import { classToClass } from 'class-transformer';
import FindAllClassesService from '@modules/classes/services/FindAllClassesService';
import convertHoursToMinutes from '@shared/utils/convertHoursToMinutes';
import UpdateClassService from '@modules/classes/services/UpdateClassService';

const classesRouter = Router();

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

classesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      cost: Joi.number().required(),
      schedule: Joi.array().items(
        Joi.object({
          week_day: Joi.number().required(),
          from: Joi.string()
            .pattern(/(\d)?\d\:\d\d/)
            .required(),
          to: Joi.string()
            .pattern(/(\d)?\d\:\d\d/)
            .required(),
        }),
      ),
    },
  }),
  async (request, response) => {
    const { subject, cost, schedule } = request.body;
    const { id: user_id } = request.user;

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
  },
);

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

classesRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      cost: Joi.number().required(),
      schedule: Joi.array().items(
        Joi.object({
          week_day: Joi.number().required(),
          from: Joi.string()
            .pattern(/(\d)?\d\:\d\d/)
            .required(),
          to: Joi.string()
            .pattern(/(\d)?\d\:\d\d/)
            .required(),
        }),
      ),
    },
  }),
  async (request, response) => {
    const { cost, subject, schedule } = request.body;
    const { id: user_id } = request.user;

    const updateClass = container.resolve(UpdateClassService);

    const updatedClass = await updateClass.execute({
      subject,
      cost,
      user_id,
      schedule,
    });

    return response.json(updatedClass);
  },
);

export default classesRouter;
