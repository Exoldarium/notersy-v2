import { BaseNoteEntry } from '../types';
import { parseDate, parseToString } from './parseData';

// check that each note is of correct type
const toNewNoteEntry = (object: unknown): BaseNoteEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

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

export default toNewNoteEntry;