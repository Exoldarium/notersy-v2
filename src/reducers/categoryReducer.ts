import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { BaseCategoryEntry, Checked } from '../types';
import { parseStorage, setStorage } from '../services/storageService';
import { AppDispatch } from '../store';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import { getDate } from '../utils/helpers';
import { parseError } from '../utils/parseData';

const initialState: BaseCategoryEntry[] = [];
// TODO: add sorting, the user could choose to sort by name or date

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(_, action: PayloadAction<BaseCategoryEntry[]>) {
      return action.payload;
    },
    addCategory(state, action: PayloadAction<BaseCategoryEntry>) {
      state.push(action.payload);
    },
    updateCategory(_, action: PayloadAction<BaseCategoryEntry[]>) {
      return action.payload;
    },
    deleteCategory(_, action: PayloadAction<BaseCategoryEntry[]>) {
      return action.payload;
    }
  }
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { storedData } = await parseStorage('storedData');

      dispatch(setCategories(storedData));
    } catch (err) {
      const error = parseError(err);
      console.error('initializeCategories action Error', error);
      throw new Error(error);
    }
  };
};

export const addNewCategory = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { storedData } = await parseStorage('storedData');

      const newEntry: BaseCategoryEntry = {
        id: uuidv4(),
        active: true,
        title: 'New Category',
        date: getDate(),
        unixTime: Date.now(),
        notes: [],
      };
      const parsedentry = toNewCategoryEntry(newEntry);

      await setStorage('storedData', storedData.concat(parsedentry));

      dispatch(addCategory(parsedentry));
      console.log(storedData, 'a new category added');
    } catch (err) {
      const error = parseError(err);
      console.error('addNewCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const updateExistingCategory = (categoryToUpdate: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { storedData } = await parseStorage('storedData');

      const updatedCategories = storedData.filter(category => category.id !== categoryToUpdate.id);

      await setStorage('storedData', updatedCategories.concat(categoryToUpdate));

      dispatch(updateCategory(updatedCategories.concat(categoryToUpdate)));
    } catch (err) {
      const error = parseError(err);
      console.error('updateExistingCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const deleteExistingCategory = (checkedIdValues: Checked[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { storedData } = await parseStorage('storedData');

      // delete selected categories based on their matching ids that are stored in checkbox state
      const ids = checkedIdValues.map(item => item.id);
      const updatedCategories = storedData.filter(category => !ids.includes(category.id));

      await setStorage('storedData', updatedCategories);

      dispatch(deleteCategory(updatedCategories));
    } catch (err) {
      const error = parseError(err);
      console.error('deletExistingCategory action Error', error);
      throw new Error(error);
    }
  };
};

export default categorySlice.reducer;