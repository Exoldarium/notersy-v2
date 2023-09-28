import { NewNoteEntry } from '../types';

const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseToString = (param: unknown): string => {
  if (!isString(param)) throw new Error('Invalid title or content input');

  return param;
};

const parseDate = (param: unknown): string => {
  if (!isString(param) || !isDate(param)) throw new Error('Invalid date input');

  return param;
};

const toNewNoteEntry = (object: unknown): NewNoteEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  if (
    'content' in object &&
    'date' in object &&
    'title' in object
  ) {
    const newEntry: NewNoteEntry = {
      content: parseToString(object.content),
      date: parseDate(object.date),
      title: parseToString(object.title)
    };

    return newEntry;
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewNoteEntry;