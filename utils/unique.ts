export function uniqueArrayByField(
  curItems: any[],
  newItems: any[],
  idField = 'id',
) {
  const existingIds = curItems.map(item => item[idField]);
  return newItems.filter(item => existingIds.indexOf(item[idField]) === -1);
}

export function uniqueArray(array: any[]) {
  return array.filter((v, i, a) => a.indexOf(v) === i);
}
