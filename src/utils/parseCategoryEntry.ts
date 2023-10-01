import { BaseCategoryEntry } from '../types';
import { isString } from './parseData';
import toNewNoteEntry from './parseNoteEntry';

// a specific typeguard to check that our input parameter is of correct type
const toNewCategoryEntry = (object: unknown): object is BaseCategoryEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'id' in object &&
    'title' in object &&
    'notes' in object
  ) {

    // parse the values returning boolean so that we are sure we are getting the types are correct
    return (
      isString(object.id) &&
      isString(object.title) &&
      Array.isArray(object.notes) &&
      object.notes.every(toNewNoteEntry)
    );
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewCategoryEntry;