import { BaseCategoryEntry } from '../types';
import { parseError } from '../utils/parseData';

// grab data from storage
const getStorage = async (key: string) => {
  try {
    const res = await chrome.storage.local.get(key);
    console.log(res);

    // check if there's a valid key in res object
    // if not create it
    if (!res[key]) {
      await chrome.storage.local.set({ [key]: [] });

      const res = await chrome.storage.local.get(key);

      return res;
    }

    console.log(res, 'this is res');
    return res;
  } catch (err) {
    const error = parseError(err);
    console.error('getStorage Error', error);
    throw new Error(error);
  }
};

// set data to storage
const setStorage = async (key: string, value: BaseCategoryEntry[]) => {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch (err) {
    const error = parseError(err);
    console.error('setStorage Error', error);
    throw new Error(error);
  }
};

const clearStorage = async () => {
  try {
    await chrome.storage.local.clear();
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