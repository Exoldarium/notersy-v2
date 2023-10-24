import { BaseCategoryEntry, StoredNoteContent } from '../types';
import { parseError } from '../utils/parseData';

// grab data from storage
const getStorage = async (key: string) => {
  try {
    const res = await chrome.storage.sync.get(key);

    // check if there's a valid key in res object
    // if not create it
    if (!res[key]) {
      await chrome.storage.sync.set({ [key]: [] });

      const res = await chrome.storage.sync.get(key);

      return res;
    }

    return res;
  } catch (err) {
    const error = parseError(err);
    console.error('getStorage Error', error);
    throw new Error(error);
  }
};

// set data to storage
const setStorage = async (key: string, value: BaseCategoryEntry[] | StoredNoteContent) => {
  try {
    await chrome.storage.sync.set({ [key]: value });
  } catch (err) {
    const error = parseError(err);
    console.error('setStorage Error', error);
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
  clearStorage
};