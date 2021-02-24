import { format, parseISO, differenceInDays } from 'date-fns';

export function formatDate(date: string) {
  if (!date) {
    return '';
  }
  return format(new Date(date), 'MMMM dd, yyyy');
}

export function formatDifference(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return '~';
  }
  return differenceInDays(parseISO(startDate), parseISO(endDate));
}
