import { test, describe, expect } from 'vitest';
import { toNewStorageEntry, toNewCategoryEntry, toNewNoteEntry } from '../../utils/parseStorageEntry';
import { BaseStorageEntry } from '../../types';

describe('functions return correct value', () => {
  const mockData: BaseStorageEntry = {
    storedData: [
      {
        id: '123',
        active: true,
        title: 'New Category',
        dateAdded: 'Sat Oct 07 2023 18:36:08',
        unixTimeAdded: 1696749517,
        dateModified: 'Sat Oct 08 2023 18:36:08',
        unixTimeModified: 1696749520,
        notes: [
          {
            id: '321',
            title: 'New note',
            dateAdded: 'Sat Oct 08 2023 18:36:08',
            unixTimeAdded: 1696749515,
            content: 'some content',
            dateModified: 'Sat Oct 08 2023 18:36:08',
            unixTimeModified: 1696749520,
          },
          {
            id: '4321',
            title: 'another note',
            dateAdded: 'Sat Oct 09 2023 18:36:08',
            unixTimeAdded: 1696749514,
            content: 'some other content',
            dateModified: 'Sat Oct 08 2023 18:36:08',
            unixTimeModified: 1696749520,
          }
        ]
      },
      {
        id: '12345',
        active: false,
        title: 'Another category',
        dateAdded: 'Sat Oct 10 2023 18:36:08',
        unixTimeAdded: 1696749513,
        dateModified: 'Sat Oct 08 2023 18:36:08',
        unixTimeModified: 1696749520,
        notes: [
          {
            id: '54321',
            title: 'some other note title',
            dateAdded: 'Sat Oct 10 2023 18:36:08',
            unixTimeAdded: 1696749512,
            content: 'some new other content',
            dateModified: 'Sat Oct 08 2023 18:36:08',
            unixTimeModified: 1696749520,
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
    // expect(() => mockData.storedData[0].notes
    //   .map(note => toNewNoteEntry(note.edit)))
    //   .toThrowError('Invalid data input');
  });
});