import thousandsSeperator from './index.js';

describe('thousandsSeperator', () => {
  test('values other than number and string in undefined out', () => {
    expect(thousandsSeperator(true))
      .toBe(undefined);

    expect(thousandsSeperator({}))
      .toBe(undefined);

    expect(thousandsSeperator([]))
      .toBe(undefined);

    expect(thousandsSeperator(() => {}))
      .toBe(undefined);
  });

  test('1 in 1 out', () => {
    expect(thousandsSeperator(1))
      .toBe('1');
  });

  test('"1" in 1 out', () => {
    expect(thousandsSeperator('1'))
      .toBe('1');
  });

  test('1000 in 1 out', () => {
    expect(thousandsSeperator(1000))
      .toBe('1,000');
  });

  test('"1000" in 1 out', () => {
    expect(thousandsSeperator('1000'))
      .toBe('1,000');
  });

  test('1000.012 in 1 out', () => {
    expect(thousandsSeperator(1000.012))
      .toBe('1,000.012');
  });

  test('"1000.012" in 1 out', () => {
    expect(thousandsSeperator('1000.012'))
      .toBe('1,000.012');
  });

  test('"1000.0120" in 1 out', () => {
    expect(thousandsSeperator('1000.0120'))
      .toBe('1,000.0120');
  });
});
