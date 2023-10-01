import { BaseStorageEntry } from '../types';
import toNewCategoryEntry from './parseCategoryEntry';

// a specific typeguard to check that our input parameter is of correct type
const toNewStorageEntry = (object: unknown): object is BaseStorageEntry => {
  if (!object || typeof object !== 'object') throw new Error('Invalid data input');

  // we check if our chrome storage key 'storedData is present in the retrieved object
  if ('storedData' in object) {
    return (
      Array.isArray(object.storedData) &&
      // check that the stored data array is of correct type
      object.storedData.every(toNewCategoryEntry)
    );
  }

  throw new Error('Incorrect data input or some fileds might be missing');
};

export default toNewStorageEntry;