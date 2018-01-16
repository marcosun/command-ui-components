/**
 * @module ThousandsSeperator
 * @param  {string | number} input
 * @return {string}
 */
export default function thousandsSeperator(input) {
  // Accept Number and String only
  if (typeof input !== 'number' && typeof input !== 'string') return undefined;

  if (isNaN(+input)) return undefined; // NaN cannot be processed

  // const stringify = Number(input).toString();

  // // Integers need to be seperated with dot
  // // Decimals remain unchanged
  // const [integers, decimals] = stringify.split('.');

  // //Seperate numbers with comma
  // const commaIntegers = integers.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');

  // return `${commaIntegers}${decimals === void 0 ? '' : '.' + decimals}`;

  // In case of 0 in front of integer, transform to number then to string
  return Number(input).toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
}
