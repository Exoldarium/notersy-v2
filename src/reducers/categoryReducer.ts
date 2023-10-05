import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { BaseCategoryEntry } from '../types';
import { getStorage, setStorage } from '../services/storageService';
import { AppDispatch } from '../store';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import { getDate } from '../utils/helpers';
import { parseError } from '../utils/parseData';

const initialState: BaseCategoryEntry[] = [];
const id = uuidv4();

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
    }
  }
});

export const {
  setCategories,
  addCategory,
  updateCategory
} = categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const categories = await getStorage('storedData');

      dispatch(setCategories(categories));
    } catch (err) {
      const error = parseError(err);
      throw new Error(error);
    }
  };
};

export const addNewCategory = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const categories = await getStorage('storedData');

      const newEntry: BaseCategoryEntry = {
        id,
        active: true,
        title: 'New Category',
        date: getDate(),
        notes: []
      };
      const parsedentry = toNewCategoryEntry(newEntry);

      await setStorage('storedData', categories.concat(parsedentry));
      dispatch(addCategory(newEntry));
      console.log(categories, 'a new category added');
    } catch (err) {
      const error = parseError(err);
      throw new Error(error);
    }
  };
};

export const updateExistingCategory = (categoryToUpdate: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    try {
      const categories = await getStorage('storedData');

      const updatedCategories = categories.filter(category => category.id !== categoryToUpdate.id);

      await setStorage('storedData', updatedCategories.concat(categoryToUpdate));
      dispatch(updateCategory(updatedCategories.concat(categoryToUpdate)));
    } catch (err) {
      const error = parseError(err);
      throw new Error(error);
    }
  };
};

export default categorySlice.reducer;