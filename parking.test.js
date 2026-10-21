const { parkingFee } = require('./parking');

describe('parkingFee', () => {
  test('PT-01 0 minutes is free', () => {
    expect(parkingFee(0, 'A')).toBe(0);
  });

  test('PT-02 15 minutes is still free (boundary)', () => {
    expect(parkingFee(15, 'A')).toBe(0);
  });

  test('PT-03 16 minutes costs one hour in zone A', () => {
    expect(parkingFee(16, 'A')).toBe(2);
  });

  test('PT-04 60 minutes costs one hour', () => {
    expect(parkingFee(60, 'A')).toBe(2);
  });

  test('PT-05 61 minutes costs two hours', () => {
    expect(parkingFee(61, 'A')).toBe(4);
  });

  test('PT-06 zone B is 1 €/h', () => {
    expect(parkingFee(120, 'B')).toBe(2);
  });

  test('PT-07 daily maximum in zone A is 12 €', () => {
    expect(parkingFee(600, 'A')).toBe(12);
  });

  test('PT-08 daily maximum in zone B is 6 €', () => {
    expect(parkingFee(600, 'B')).toBe(6);
  });

  test('PT-09 resident pays 50 %', () => {
    expect(parkingFee(120, 'A', { resident: true })).toBe(2);
  });

  test('PT-10 unknown zone throws', () => {
    expect(() => parkingFee(30, 'C')).toThrow(TypeError);
  });

  test('PT-11 negative minutes throws', () => {
    expect(() => parkingFee(-1, 'A')).toThrow(TypeError);
  });

  test('PT-12 minutes as a string throws', () => {
    expect(() => parkingFee('30', 'A')).toThrow(TypeError);
  });

  test('PT-13 61 minutes in zone B, resident -> 1.00', () => {
    expect(parkingFee(61, 'B', { resident: true })).toBe(1);
  });

  test('PT-14 resident, 10 hours in zone A -> half of the daily maximum (6.00)', () => {
    expect(parkingFee(600, 'A', { resident: true })).toBe(6);
  });
});
