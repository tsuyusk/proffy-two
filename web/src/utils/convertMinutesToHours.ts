export default function convertMinutesToHours(minutes: number) {
  const hours = minutes * (1 / 60);

  const [hour, decimalPartOfHours] = `${hours}`.split('.');

  const decimalPartOfHoursInMinutes = Number(decimalPartOfHours) * 60;

  return `${hour.padStart(2, '0')}:${decimalPartOfHoursInMinutes || '00'}h`;
}
