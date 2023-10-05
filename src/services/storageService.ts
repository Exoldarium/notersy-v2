import { BaseCategoryEntry, BaseStorageEntry } from '../types';
import { parseError } from '../utils/parseData';
import toNewStorageEntry from '../utils/parseStorageEntry';

// grab data from storage
const getStorage = async (key: string): Promise<BaseStorageEntry> => {
  try {
    const res = await chrome.storage.sync.get(key);

    // check if there's a valid key in res object
    // if not create it
    console.log(Object.values(res).length, 'res');
    if (Object.values(res).length === 0) {
      await chrome.storage.sync.set({ [key]: [] });

      const res = await chrome.storage.sync.get(key);

      const newEntry = toNewStorageEntry(res);

      return newEntry;
    }

    // parse data that we get from storage
    // key is hardcoded to 'storedData'
    const newEntry = toNewStorageEntry(res);

    return newEntry;
  } catch (err) {
    const error = parseError(err);
    console.error('getStorage Error');
    throw new Error(error);
  }
};

// set data to storage
const setStorage = async (key: string, value: BaseCategoryEntry[]) => {
  try {
    await chrome.storage.sync.set({ [key]: value });
  } catch (err) {
    const error = parseError(err);
    console.error('setStorage Error');
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