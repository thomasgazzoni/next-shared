import title from 'title';

export default function capitalize(text: string) {
  return title(text.toString().replace(/-|_/g, ' '));
}
