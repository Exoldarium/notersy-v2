import { BaseCategoryEntry } from '../types';
import toNewStorageEntry from '../utils/parseStorageEntry';

// TODO: add helper for error handling

// grab data from storage
const getStorage = async (key: string): Promise<BaseCategoryEntry[]> => {
  const res = await chrome.storage.sync.get(key);

  // parse data that we get from storage
  // key is hardcoded to 'storedData'
  const newEntry = toNewStorageEntry(res);

  return newEntry.storedData;
};

// set data to storage
const setStorage = async (key: string, value: BaseCategoryEntry[]) => {
  console.log(key, value);
  await chrome.storage.sync.set({ [key]: value });
};

const clearStorage = async () => {
  try {
    await chrome.storage.sync.clear();
    console.log('cleared');
  } catch (error) {
    console.log(error);
  }
};

export {
  getStorage,
  setStorage,
  clearStorage,
};