import { describe, expect, test } from 'vitest';
import {
  isBool,
  isDate,
  isNumber,
  isString,
  parseDate,
  parseToBool,
  parseToNumber,
  parseToString
} from '../../utils/parseData';

describe('functions return correct value', () => {
  test('return boolean or throw error', () => {
    expect(isString('string')).toBe(true);
    expect(isString(1)).toBe(false);

    expect(isNumber(1)).toBe(true);
    expect(isNumber('number')).toBe(false);

    expect(isDate('Sat Oct 07 2023 18:36:08')).toBe(true);
    expect(isDate('heyoo')).toBe(false);
    expect(() => isDate(1)).toThrowError();
    expect(() => isDate(null)).toThrowError();

    expect(isBool(true)).toBe(true);
    expect(isBool('true')).toBe(false);
  });
});

describe('functions parse the data correctly', () => {
  test('return parsed value or throw error', () => {
    expect(parseToString('string')).toBeTypeOf('string');
    expect(() => parseToString(1)).toThrowError();
    expect(() => parseToString(null)).toThrowError();
    expect(() => parseToString({})).toThrowError();

    expect(parseToBool(true)).toBeTypeOf('boolean');
    expect(() => parseToBool(1)).toThrowError();
    expect(() => parseToBool(null)).toThrowError();
    expect(() => parseToBool({})).toThrowError();

    expect(parseDate('Sat Oct 07 2023 18:36:08')).toBeTypeOf('string');
    expect(parseDate('10/07/2023')).toBeTypeOf('string');
    expect(() => parseDate(1)).toThrowError();
    expect(() => parseDate(null)).toThrowError();
    expect(() => parseDate({})).toThrowError();

    expect(parseToNumber(1)).toBeTypeOf('number');
    expect(() => parseToNumber('1')).toThrowError();
    expect(() => parseToNumber(null)).toThrowError();
    expect(() => parseToNumber({})).toThrowError();
  });
});