import { BaseCategoryEntry, BaseNoteEntry, BaseStorageEntry } from '../types';
import { parseDate, parseToBool, parseToNumber, parseToString } from './parseData';

// validate and parse the entries
// parse each note
export const toNewNoteEntry = (object: unknown): BaseNoteEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  // check if correct keys are present in each entry
  if (
    'active' in object &&
    'content' in object &&
    'date' in object &&
    'title' in object &&
    'id' in object &&
    'unixTime' in object
  ) {
    // parse each value and return correct type 
    const newEntry: BaseNoteEntry = {
      active: parseToBool(object.active),
      content: parseToString(object.content),
      date: parseDate(object.date),
      title: parseToString(object.title),
      id: parseToString(object.id),
      unixTime: parseToNumber(object.unixTime)
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

// parse each category
export const toNewCategoryEntry = (object: unknown): BaseCategoryEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'active' in object &&
    'title' in object &&
    'notes' in object &&
    'id' in object &&
    'date' in object &&
    'unixTime' in object &&
    Array.isArray(object.notes)
  ) {
    // parse each individual note
    const parsedNotes = object.notes.map(note => toNewNoteEntry(note));

    const newEntry: BaseCategoryEntry = {
      active: parseToBool(object.active),
      title: parseToString(object.title),
      id: parseToString(object.id),
      date: parseDate(object.date),
      unixTime: parseToNumber(object.unixTime),
      notes: parsedNotes
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

const toNewStorageEntry = (object: unknown): BaseStorageEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'storedData' in object &&
    Array.isArray(object.storedData)
  ) {
    // parse each individual category
    const parsedCategories = object.storedData.map(category => toNewCategoryEntry(category));

    const newEntry: BaseStorageEntry = {
      storedData: parsedCategories
    };

    return newEntry;
  }
  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewStorageEntry;