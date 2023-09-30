/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from '@reduxjs/toolkit';
import { BaseCategoryEntry } from '../types';
import { getStorage, setStorage } from '../services/storageService';
import { AppDispatch } from '../store';

const initialState: BaseCategoryEntry[] = [];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(_, action) {
      return action.payload;
    },
    addCategory(state, action) {
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
    const categories = await getStorage('notes');
    console.log({ getStorage: categories });
    dispatch(setCategories(categories));
  };
};

export const addNewCategory = (newCategory: BaseCategoryEntry) => {
  return async (dispatch: AppDispatch) => {
    const categories = await getStorage('notes');
    await setStorage('notes', categories.concat(newCategory));
    dispatch(addCategory(newCategory));
  };
};

export default categorySlice.reducer;