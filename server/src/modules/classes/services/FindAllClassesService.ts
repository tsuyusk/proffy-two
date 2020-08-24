import { inject, injectable } from 'tsyringe';
import IClassesRepository from '../repositories/IClassesRepository';

interface IRequest {
  week_day: number;
  subject: string;
  time: number;
}

@injectable()
class FindAllClassesService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}
  public async execute({ week_day, subject, time }: IRequest) {
    const classes = await this.classesRepository.findAll({
      week_day,
      subject,
      time,
    });

    return classes;
  }
}
export default FindAllClassesService;
