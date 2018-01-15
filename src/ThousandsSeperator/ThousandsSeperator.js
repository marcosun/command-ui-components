/**
 * @module ThousandsSeperator
 * @param  {string | number} input
 * @return {string}
 */
export default function thousandsSeperator(input) {
  // Accept Number and String only
  if (typeof input !== 'number' && typeof input !== 'string') return undefined;

  if (isNaN(+input)) return undefined; // NaN cannot be processed

  // const stringify = input.toString();

  // // Integers need to be seperated with dot
  // // Decimals remain unchanged
  // const [integers, decimals] = stringify.split('.');

  // //Seperate numbers with comma
  // const commaIntegers = integers.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');

  // return `${commaIntegers}${decimals === void 0 ? '' : '.' + decimals}`;

  return input.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
}
