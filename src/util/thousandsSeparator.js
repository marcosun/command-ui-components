export default function thousandsSeparator(input) {
  // Accept Number and String only
  if (typeof input !== 'number' && typeof input !== 'string') return 0;

  if (Number.isNaN(+input)) return 0; // NaN cannot be processed

  // In case of 0 in front of integer, transform to number then to string
  return (+input).toString().replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
}
