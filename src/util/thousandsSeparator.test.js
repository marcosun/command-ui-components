import thousandsSeparator from './thousandsSeparator';

test('Values unable to convert to number return 0.', () => {
  const result = 0;

  expect(thousandsSeparator('string')).toBe(result);

  expect(thousandsSeparator(NaN)).toBe(result);

  expect(thousandsSeparator({})).toBe(result);

  expect(thousandsSeparator(() => {})).toBe(result);
});


test('Do not add separator to decimal values.', () => {
  expect(thousandsSeparator(123456.123456)).toBe('123,456.123456');
});
