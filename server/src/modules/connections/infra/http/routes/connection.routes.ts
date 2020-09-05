import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateConnectionService from '@modules/connections/services/CreateConnectionService';
import GetAllConnectionsService from '@modules/connections/services/GetAllConnectionsService';
import GetAllConnectionsFromUserService from '@modules/connections/services/GetAllConnectionsFromUserService';

const connectionRouter = Router();

connectionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().min(2).required(),
    },
  }),
  async (request, response) => {
    const { user_id } = request.body;

    const createConnection = container.resolve(CreateConnectionService);

    const newConnection = await createConnection.execute({
      user_id,
    });

    return response.json(newConnection);
  },
);

connectionRouter.get('/', async (request, response) => {
  const getConnection = container.resolve(GetAllConnectionsService);

  const connections = await getConnection.execute();

  return response.json({ amount: connections });
});

connectionRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;

  const getAllConnectionsFromUserService = container.resolve(
    GetAllConnectionsFromUserService,
  );

  const connectionsFromUser = await getAllConnectionsFromUserService.execute({
    user_id,
  });

  return response.json({ amount: connectionsFromUser });
});

export default connectionRouter;
