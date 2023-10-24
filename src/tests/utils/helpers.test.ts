import { describe, expect, test } from 'vitest';
import { getDate, setNoteEditPropertyToFalse } from '../../utils/helpers';
import { BaseCategoryEntry } from '../../types';

describe('functions return correct value', () => {
  test('getDate returns correct date', () => {
    const epoch = Date.now();
    const date = new Date(epoch).toString().substring(0, 24);
    const dateToTest = getDate();

    expect(dateToTest).toHaveLength(24);
    expect(dateToTest).toBe(date);
  });

  test('setNoteEditPropertyToFalse returns correct value', () => {
    const mockCategory: BaseCategoryEntry = {
      id: '123',
      active: true,
      title: 'New Category',
      date: 'Sat Oct 07 2023 18:36:08',
      unixTime: 1696749517,
      notes: [
        {
          id: '321',
          edit: true,
          title: 'New note',
          date: 'Sat Oct 08 2023 18:36:08',
          unixTime: 1696749515,
          content: 'some content'
        },
        {
          id: '4321',
          edit: true,
          title: 'another note',
          date: 'Sat Oct 09 2023 18:36:08',
          unixTime: 1696749514,
          content: 'some other content'
        }
      ]
    };
    const categoryWithUpdatedNotes = setNoteEditPropertyToFalse(mockCategory);

    expect(categoryWithUpdatedNotes.notes[0].edit).toBe(false);
    expect(categoryWithUpdatedNotes.notes[1].edit).toBe(false);
  });
});