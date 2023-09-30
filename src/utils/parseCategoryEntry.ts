import { BaseCategoryEntry } from '../types';
import { parseToString } from './parseNoteEntry';

const toNewCategoryEntry = (object: unknown): BaseCategoryEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'id' in object &&
    'title' in object &&
    'notes' in object
  ) {

    const newEntry: BaseCategoryEntry = {
      id: parseToString(object.id),
      title: parseToString(object.title),
      notes: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewCategoryEntry;