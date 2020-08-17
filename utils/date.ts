import { format, parseISO } from 'date-fns';

export default function formatDate(date: string) {
  if (!date) {
    return '';
  }
  return format(parseISO(date), 'MMMM dd, yyyy');
}
