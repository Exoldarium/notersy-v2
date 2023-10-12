import { test, describe, expect } from 'vitest';
import toNewStorageEntry, { toNewCategoryEntry } from '../../utils/parseStorageEntry';

describe('functions return correct value', () => {
  const mockData = {
    storedData: [
      {
        id: '123',
        active: true,
        title: 'New Category',
        date: 'Sat Oct 07 2023 18:36:08',
        unixTime: 1696749517,
        notes: []
      }
    ]
  };

  test('return correct value or throw error', () => {
    expect(toNewStorageEntry(mockData)).toStrictEqual(mockData);
    expect(() => toNewStorageEntry(mockData.storedData)).toThrowError('Incorrect data input or some fileds might be missing');
    expect(() => toNewStorageEntry(1)).toThrowError('Invalid data input');

    const parsedCategories = mockData.storedData.map(category => toNewCategoryEntry(category));

    expect(parsedCategories).toStrictEqual(mockData.storedData);
    expect(() => mockData.storedData
      .map(category => toNewCategoryEntry(category.active)))
      .toThrowError('Invalid data input');
  });
});