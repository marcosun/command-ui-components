/**
 * [thousandsSeperator thousands seperator]
 * @param  {string/number} data
 * @return {string}
 */
export default function thousandsSeperator(data) {
  if (typeof data === 'boolean' || typeof data === 'object' || isNaN(+data)) {
    throw data;
  }

  return data.toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
}
