// import { useEffect, useState } from 'react';
// import { BaseCategoryEntry } from '../types';
// import { getStorage, setStorage } from './storageService';

// const useStorage = () => {
//   const [clientData, setClientData] = useState<BaseCategoryEntry[]>([]);
//   // const [storageData, setStorageData] = useState<BaseCategoryEntry[]>([]);

//   useEffect(() => {
//     void (async () => {
//       const res = await getStorage('notes');

//       // if (res === undefined) {
//       //   await setStorage('notes', clientData);
//       //   const emptyRes = await getStorage('notes');
//       //   setClientData(emptyRes);
//       //   return;
//       // }

//       setClientData(res);
//     })();
//   }, []);

//   const addNewCategory = async (value: BaseCategoryEntry) => {
//     await setStorage('notes', value);
//   };

//   const clearStorage = async () => {
//     await setStorage('notes', []);
//   };

//   console.log({ data: clientData });

//   return {
//     clientData,
//     addNewCategory,
//     clearStorage,
//     setClientData
//   };
// };

// export default useStorage;