import { BaseCategoryEntry, BaseNoteEntry, BaseStorageEntry } from '../types';
import { parseDate, parseToBool, parseToNumber, parseToString } from './parseData';

// validate and parse the entries
// parse each note
const toNewNoteEntry = (object: unknown): BaseNoteEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  // check if correct keys are present in each entry
  if (
    'content' in object &&
    'dateAdded' in object &&
    'title' in object &&
    'id' in object &&
    'unixTimeAdded' in object &&
    'dateModified' in object &&
    'unixTimeModified' in object &&
    'url' in object
  ) {
    // parse each value and return correct type 
    const newEntry: BaseNoteEntry = {
      content: parseToString(object.content),
      dateAdded: parseDate(object.dateAdded),
      title: parseToString(object.title),
      id: parseToString(object.id),
      unixTimeAdded: parseToNumber(object.unixTimeAdded),
      dateModified: parseToString(object.dateModified),
      unixTimeModified: parseToNumber(object.unixTimeModified),
      url: parseToString(object.url)
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

// parse each category
const toNewCategoryEntry = (object: unknown): BaseCategoryEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'active' in object &&
    'title' in object &&
    'notes' in object &&
    'id' in object &&
    'dateAdded' in object &&
    'unixTimeAdded' in object &&
    'dateModified' in object &&
    'unixTimeModified' in object &&
    Array.isArray(object.notes)
  ) {
    // parse each individual note
    const parsedNotes = object.notes.map(note => toNewNoteEntry(note));

    const newEntry: BaseCategoryEntry = {
      active: parseToBool(object.active),
      title: parseToString(object.title),
      id: parseToString(object.id),
      dateAdded: parseDate(object.dateAdded),
      unixTimeAdded: parseToNumber(object.unixTimeAdded),
      dateModified: parseToString(object.dateModified),
      unixTimeModified: parseToNumber(object.unixTimeModified),
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

export {
  toNewNoteEntry,
  toNewCategoryEntry,
  toNewStorageEntry
};