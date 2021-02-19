/**
 * Use regular expression to remove zeros after a decimal
 * NOTE: will not work for integers
 * @param value string to check
 */
export function parseResult(value: string, trimZeros: boolean) {
  return trimZeros ? value.replace(/\.?0*$/, '') : value;
}

/**
 * Round down a number
 * @param precision how many decimals to take in consideration (Default: 0)
 * @param trimZeros if true, remove not meaningful zeros from the result (Default: false)
 */
export function floor(value: number | string, precision = 8, trimZeros = true) {
  // NOTE: we return 0 for undefined values,
  // useful for react render template when the data is not yet ready
  if (value === undefined || value === null) {
    return parseResult('0', trimZeros);
  }

  // Using Big.js way
  // NOTE: there is as a problem with bigValue.round when trimZeros=true,
  // return getFixedValue(value, precision, trimZeros);

  // LoMo way
  const needToFixed =
    value.toString().indexOf('e+') !== -1 ||
    value.toString().indexOf('e-') !== -1;

  const [integer, decimal] = (needToFixed && typeof value === 'number'
    ? value.toFixed(20)
    : value.toString()
  ).split('.');

  if (!decimal || Number.parseFloat(decimal) === 0) {
    return parseResult(Number(value).toFixed(precision), trimZeros);
  }

  const decimalPart = Number.parseFloat(
    `0.${decimal.substring(0, decimal.length > 14 ? 14 : decimal.length)}`,
  )
    .toFixed(14)
    .substring(0, precision + 2)
    .split('.')[1];

  if (!decimalPart) {
    return parseResult(integer, trimZeros);
  }

  return parseResult(`${integer}.${decimalPart}`, trimZeros);
}
