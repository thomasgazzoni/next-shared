import title from 'title';

export default function capitalize(text: string) {
  text = text || '';
  return title(text.toString().replace(/-|_/g, ' '));
}
