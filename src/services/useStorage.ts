import { useEffect, useState } from 'react';
import { BaseCategoryEntry } from '../types';
import { getStorage, setStorage } from './storageService';

const useStorage = () => {
  const [storageData, setStorageData] = useState<BaseCategoryEntry[]>([]);
  const [getStorageData, setGetStorageData] = useState<BaseCategoryEntry[]>([]);

  useEffect(() => {
    void (async () => {
      await setStorage('notes', storageData);
      const res = await getStorage('notes');
      setGetStorageData(res);
    })();
  }, [storageData]);

  const addNewCategory = (value: BaseCategoryEntry) => {
    setStorageData(storageData.concat(value));
  };

  console.log({ data: getStorageData });

  return {
    storageData,
    addNewCategory,
    getStorageData,
    setStorageData,
    setGetStorageData
  };
};

export default useStorage;