import { test, describe, expect } from 'vitest';
import { toNewStorageEntry, toNewCategoryEntry, toNewNoteEntry } from '../../utils/parseStorageEntry';
import { BaseStorageEntry } from '../../types';

describe('functions return correct value', () => {
  const mockData: BaseStorageEntry = {
    storedData: [
      {
        id: '123',
        active: true,
        editor: false,
        title: 'New Category',
        date: 'Sat Oct 07 2023 18:36:08',
        unixTime: 1696749517,
        notes: [
          {
            id: '321',
            edit: false,
            title: 'New note',
            date: 'Sat Oct 08 2023 18:36:08',
            unixTime: 1696749515,
            content: 'some content'
          },
          {
            id: '4321',
            edit: false,
            title: 'another note',
            date: 'Sat Oct 09 2023 18:36:08',
            unixTime: 1696749514,
            content: 'some other content'
          }
        ]
      },
      {
        id: '12345',
        active: false,
        editor: false,
        title: 'Another category',
        date: 'Sat Oct 10 2023 18:36:08',
        unixTime: 1696749513,
        notes: [
          {
            id: '54321',
            edit: false,
            title: 'some other note title',
            date: 'Sat Oct 10 2023 18:36:08',
            unixTime: 1696749512,
            content: 'some new other content'
          }
        ]
      }
    ]
  };

  test('return correct value or throw error', () => {
    expect(toNewStorageEntry(mockData)).toStrictEqual(mockData);
    expect(() => toNewStorageEntry(mockData.storedData)).toThrowError('Incorrect data input or some fileds might be missing');
    expect(() => toNewStorageEntry(1)).toThrowError('Invalid data input');

    const parsedCategories = mockData.storedData.map(category => toNewCategoryEntry(category));
    const parsedNotes = parsedCategories[0].notes.map(note => toNewNoteEntry(note));

    expect(parsedCategories).toStrictEqual(mockData.storedData);
    expect(() => mockData.storedData
      .map(category => toNewCategoryEntry(category.active)))
      .toThrowError('Invalid data input');

    expect(parsedNotes).toStrictEqual(mockData.storedData[0].notes);
    expect(() => mockData.storedData[0].notes
      .map(note => toNewNoteEntry(note.edit)))
      .toThrowError('Invalid data input');
  });
});