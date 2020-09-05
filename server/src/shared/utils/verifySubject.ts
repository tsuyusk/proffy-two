import AppError from '@shared/errors/AppError';

export default function verifySubject(subject: string) {
  const subjects = [
    'maths',
    'portuguese',
    'geography',
    'history',
    'eletronics',
    'programming',
    'physics',
    'chemistry',
    'arts',
    'sociology',
    'philosophy',
    'music',
    'religion',
    'sports',
  ];

  if (!subjects.includes(subject)) {
    throw new AppError('Unknown subject');
  }
}
