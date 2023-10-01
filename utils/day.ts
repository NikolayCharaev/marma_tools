import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentDateTime = () => {
  const moscowTime = dayjs().tz('Europe/Moscow').format('DD.MM.YY HH:mm');
  return moscowTime;
};