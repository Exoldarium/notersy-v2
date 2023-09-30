import { BaseCategoryEntry } from '../types';
// import toNewStorageEntry from '../utils/parseCategoryEntry';

const getStorage = async (): Promise<BaseCategoryEntry[]> => {
  const res = await chrome.storage.sync.get('storedData');

  // const parsedStorageEntry = res.storedData.every(key => toNewStorageEntry(key));

  // console.log({ notesRes: parsedStorageEntry });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.storedData;
};

const setStorage = async (value: BaseCategoryEntry[]) => {
  // const newEntry = toNewNoteEntry(value);
  console.log(value);
  await chrome.storage.sync.set({ 'storedData': value });
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