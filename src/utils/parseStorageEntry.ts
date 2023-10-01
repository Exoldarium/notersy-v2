import { BaseCategoryEntry, BaseNoteEntry, BaseStorageEntry } from '../types';
import { parseDate, parseToString } from './parseData';

// validate and parse the entries
// parse each note
export const toNewNoteEntry = (object: unknown): BaseNoteEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  // check if correct keys are present in each entry
  if (
    'content' in object &&
    'date' in object &&
    'title' in object &&
    'id' in object
  ) {
    // parse each value and return correct type 
    const newEntry: BaseNoteEntry =
    {
      content: parseToString(object.content),
      date: parseDate(object.date),
      title: parseToString(object.title),
      id: parseToString(object.id)
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

// parse each category
const toNewCategoryEntry = (object: unknown): BaseCategoryEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'title' in object &&
    'notes' in object &&
    'id' in object
  ) {
    // check if object.notes is an array
    if (Array.isArray(object.notes)) {
      // parse each of the values
      const parsedNotes = object.notes.map(note => toNewNoteEntry(note));

      const newEntry: BaseCategoryEntry = {
        title: parseToString(object.title),
        id: parseToString(object.id),
        notes: parsedNotes
      };

      return newEntry;
    }
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

const toNewStorageEntry = (object: unknown): BaseStorageEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if ('storedData' in object) {
    if (Array.isArray(object.storedData)) {
      const parsedCategories = object.storedData.map(category => toNewCategoryEntry(category));

      const newEntry: BaseStorageEntry = {
        storedData: parsedCategories
      };

      return newEntry;
    }
  }
  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewStorageEntry;