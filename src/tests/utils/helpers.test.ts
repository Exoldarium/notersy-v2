import { describe, expect, test } from 'vitest';
import { getDate } from '../../utils/helpers';

describe('functions return correct value', () => {
  test('getDate returns correct date', () => {
    const epoch = Date.now();
    const date = new Date(epoch).toString().substring(0, 24);
    const dateToTest = getDate();

    expect(dateToTest).toHaveLength(24);
    expect(dateToTest).toBe(date);
  });
});