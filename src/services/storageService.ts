import { BaseCategoryEntry } from '../types';
import { parseError } from '../utils/parseData';
import toNewStorageEntry from '../utils/parseStorageEntry';

// grab data from storage
const getStorage = async (key: string): Promise<BaseCategoryEntry[]> => {
  try {
    const res = await chrome.storage.sync.get(key);

    // parse data that we get from storage
    // key is hardcoded to 'storedData'
    const newEntry = toNewStorageEntry(res);

    return newEntry.storedData;
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

// set data to storage
const setStorage = async (key: string, value: BaseCategoryEntry[]) => {
  try {
    await chrome.storage.sync.set({ [key]: value });
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

const clearStorage = async () => {
  try {
    await chrome.storage.sync.clear();
    console.log('cleared');
  } catch (err) {
    const error = parseError(err);
    throw new Error(error);
  }
};

export {
  getStorage,
  setStorage,
  clearStorage,
};