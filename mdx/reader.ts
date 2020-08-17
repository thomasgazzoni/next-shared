const frontMatterPattern = new RegExp('^(?:\r\n?|\n)*---([^]*?)---');

export function readMDXFrontMatter(content: string) {
  if (!content.match(frontMatterPattern)) {
    return { title: 'None' };
  }

  const result: Record<string, any> = {};

  frontMatterPattern
    .exec(content)[1]
    .replace(/(\r\n?|\n){2,}/g, '\n') // remove excess newlines
    .replace(/(\r\n?|\n) {2,}/g, ' ') // treat two-space indentation as a wrapped line
    //    .replace(/[ \t]{2,}/g, ' ') // remove excess spaces or tabs (but no new lines)
    .split('\n')
    .forEach(line => {
      if (line.match(/^\s?#/)) {
        return; // ignore lines starting with #
      }
      const parts = line.split(/:(.+)?/); // split on _first_ colon
      if (parts.length < 2) {
        return; // key: value pair is required
      }

      const key = (parts[0] || '').trim();
      let value: any | any[] = (parts[1] || '').trim();

      value = coerceValue(value);

      if (value[0] === '[' && value[value.length - 1] === ']') {
        value = value
          .substring(1, value.length - 1)
          .trim()
          .split(/\s*,\s*/)
          .map(val => {
            return coerceValue(val);
          });
      }

      result[key] = value;
    });

  return result;
}

function coerceValue(value: string) {
  // Boolean
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }

  // Date
  const date = Date.parse(value);
  if (date) {
    return date;
  }

  // Number
  const num = +value;
  if (num) {
    return num;
  }

  // String
  if (value[0] === "'" && value[value.length - 1] === "'") {
    return value.substring(1, value.length - 1);
  }

  return value;
}
