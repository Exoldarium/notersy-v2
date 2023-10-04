import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseCategoryEntry } from '../types';
import { getStorage, setStorage } from '../services/storageService';
import { AppDispatch } from '../store';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';

const initialState: BaseCategoryEntry[] = [];

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
    const categories = await getStorage('storedData');
    dispatch(setCategories(categories));
  };
};

export const addNewCategory = (newCategory: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    const categories = await getStorage('storedData');
    const parsedentry = toNewCategoryEntry(newCategory);

    await setStorage('storedData', categories.concat(parsedentry));
    dispatch(addCategory(newCategory));
  };
};

export const updateExistingCategory = (categoryToUpdate: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    const categories = await getStorage('storedData');

    const updatedCategories = categories.filter(category => category.id !== categoryToUpdate.id);

    await setStorage('storedData', updatedCategories.concat(categoryToUpdate));
    dispatch(updateCategory(updatedCategories.concat(categoryToUpdate)));
  };
};

export default categorySlice.reducer;