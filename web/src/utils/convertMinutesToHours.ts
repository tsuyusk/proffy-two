export default function convertMinutesToHours(
  minutes: number,
  includesH: boolean = true,
) {
  const hours = minutes * (1 / 60);

  const [hour, decimalPartOfHours] = `${hours}`.split('.');

  const decimalPartOfHoursInMinutes = String(
    Number(decimalPartOfHours) * 60 || '',
  ).substring(0, 2);

  return `${hour.padStart(2, '0')}:${decimalPartOfHoursInMinutes || '00'}${
    includesH ? 'h' : ''
  }`;
}
