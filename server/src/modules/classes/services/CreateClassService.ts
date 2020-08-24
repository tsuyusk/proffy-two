import { inject, injectable } from 'tsyringe';
import IClassesRepository from '../repositories/IClassesRepository';
import ICreateClassDTO from '../dtos/ICreateClassDTO';
import AppError from '@shared/errors/AppError';

interface IRequest extends ICreateClassDTO {}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}
  public async execute({ subject, cost, user_id }: IRequest) {
    const hasClassWithSameSubjectFromUser = await this.classesRepository.findClassByUserId(
      {
        subject,
        user_id,
      },
    );

    if (hasClassWithSameSubjectFromUser) {
      throw new AppError('You cannot create two classes with same subject');
    }

    const newClass = await this.classesRepository.create({
      subject,
      cost,
      user_id,
    });

    return newClass;
  }
}
export default CreateClassService;
