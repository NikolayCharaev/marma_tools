
import dayjs from 'dayjs'

export const getCurrentDateTime = () => {
    const currentDate = dayjs().format('DD.MM.YY');
    return currentDate;
  }