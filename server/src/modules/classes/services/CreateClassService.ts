import { inject, injectable } from 'tsyringe';
import IClassesRepository from '../repositories/IClassesRepository';
import ICreateClassDTO from '../dtos/ICreateClassDTO';
import AppError from '@shared/errors/AppError';
import verifySubject from '@shared/utils/verifySubject';

interface IRequest extends ICreateClassDTO {}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}
  public async execute({ subject, cost, user_id }: IRequest) {
    const hasClassFromUser = await this.classesRepository.findClassByUserId(
      user_id,
    );

    if (hasClassFromUser) {
      throw new AppError('You cannot create two classes');
    }

    verifySubject(subject);

    const newClass = await this.classesRepository.create({
      subject,
      cost,
      user_id,
    });

    return newClass;
  }
}
export default CreateClassService;
