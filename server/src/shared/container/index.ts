import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHashProvider from './providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from './providers/HashProvider/implementations/BCryptHashProvider';

import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ClassesRepository from '@modules/classes/infra/typeorm/repositories/ClassesRepository';

import IClassSchedulesRepository from '@modules/classes/repositories/IClassSchedulesRepository';
import ClassSchedulesRepository from '@modules/classes/infra/typeorm/repositories/ClassSchedulesRepository';

import IConnectionsRepository from '@modules/connections/repositories/IConnectionsRepository';
import ConnectionsRepository from '@modules/connections/infra/typeorm/repository/ConnectionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository,
);

container.registerSingleton<IClassSchedulesRepository>(
  'ClassSchedulesRepository',
  ClassSchedulesRepository,
);

container.registerSingleton<IConnectionsRepository>(
  'ConnectionsRepository',
  ConnectionsRepository,
);
