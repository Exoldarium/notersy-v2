import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseCategoryEntry } from '../types';
import { getStorage, setStorage } from '../services/storageService';
import { AppDispatch } from '../store';

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
    }
  }
});

export const {
  setCategories,
  addCategory,
} = categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch: AppDispatch) => {
    const categories = await getStorage('storedData');
    console.log({ getStorage: categories });
    dispatch(setCategories(categories));
  };
};

export const addNewCategory = (newCategory: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    const categories = await getStorage('storedData');
    await setStorage('storedData', categories.concat(newCategory));
    dispatch(addCategory(newCategory));
  };
};

export default categorySlice.reducer;