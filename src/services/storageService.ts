import { BaseCategoryEntry } from '../types';
import toNewStorageEntry from '../utils/parseStorageEntry';

const getStorage = async (key: string): Promise<BaseCategoryEntry[]> => {
  const res = await chrome.storage.sync.get(key);

  // check if the data we grab from storage is of correct type
  // key is hardcoded to res.storedData
  const parsedStorageEntry = toNewStorageEntry(res);

  if (!parsedStorageEntry) {
    throw new Error('Type error. Invalid data input or some fields are missing');
  }

  return res.storedData;
};

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