import { BaseCategoryEntry } from '../types';

const getStorage = async (key: string): Promise<BaseCategoryEntry[]> => {
  const res = await chrome.storage.sync.get(key);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.log({ storage: res.notes });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.notes;
};

const setStorage = async (key: string, value: BaseCategoryEntry[]) => {
  // const newEntry = toNewNoteEntry(value);
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