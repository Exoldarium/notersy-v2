import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { BaseCategoryEntry, BaseNoteEntry, Checked } from '../types';
import { setStorage } from '../services/storageService';
import { AppDispatch } from '../store';
import { toNewCategoryEntry, toNewNoteEntry } from '../utils/parseStorageEntry';
import { getDate } from '../utils/helpers';
import { parseError, parseStorage } from '../utils/parseData';
import { setNotificationMessage } from './messageReducer';

const initialState: BaseCategoryEntry[] = [];

// notes and categories CRUD
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
    },
    addNote(_, action: PayloadAction<BaseCategoryEntry[]>) {
      return action.payload;
    },
    updateNote(_, action: PayloadAction<BaseCategoryEntry[]>) {
      return action.payload;
    }
  }
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  addNote,
  updateNote
} = categorySlice.actions;

export const initializeCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { storedData } = await parseStorage('storedData');

      dispatch(setCategories(storedData));
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('initializeCategories action Error', error);
      throw new Error(error);
    }
  };
};

export const addNewCategory = (categories: BaseCategoryEntry[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newCategoryEntry: BaseCategoryEntry = {
        id: uuidv4(),
        active: true,
        title: 'New Category',
        dateAdded: getDate(),
        unixTimeAdded: Date.now(),
        dateModified: getDate(),
        unixTimeModified: Date.now(),
        notes: [],
      };

      // parse data
      const parsedCategoryEntry = toNewCategoryEntry(newCategoryEntry);

      await setStorage('storedData', categories.concat(parsedCategoryEntry));

      dispatch(addCategory(parsedCategoryEntry));
      console.log(categories, 'a new category added');
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('addNewCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const updateExistingCategory = (
  categories: BaseCategoryEntry[],
  categoryToUpdate: BaseCategoryEntry
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedCategories = categories.filter(category => category.id !== categoryToUpdate.id);

      await setStorage('storedData', updatedCategories.concat(categoryToUpdate));

      dispatch(updateCategory(updatedCategories.concat(categoryToUpdate)));
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('updateExistingCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const deleteExistingCategory = (
  categories: BaseCategoryEntry[],
  checkedIdValues: Checked[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      // delete selected categories based on their matching ids that are stored in checkbox state
      const ids = checkedIdValues.map(item => item.id);
      const updatedCategories = categories.filter(category => !ids.includes(category.id));

      await setStorage('storedData', updatedCategories);

      dispatch(deleteCategory(updatedCategories));
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('deletExistingCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const addNewNote = (
  categories: BaseCategoryEntry[],
  category: BaseCategoryEntry,
  content: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newNoteEntry: BaseNoteEntry = {
        id: uuidv4(),
        title: 'New Category',
        dateAdded: getDate(),
        unixTimeAdded: Date.now(),
        dateModified: getDate(),
        unixTimeModified: Date.now(),
        url: '',
        content,
      };

      const parsedNoteEntry = toNewNoteEntry(newNoteEntry);

      // add a new note to the notes array and create an updated category
      const notes = category.notes.concat(parsedNoteEntry);
      const categoryWithNotes: BaseCategoryEntry = {
        ...category,
        notes,
      };

      // filter the category that we are updating with a new note
      const updatedCategories = categories.filter(category => category.id !== categoryWithNotes.id);

      await setStorage('storedData', updatedCategories.concat(categoryWithNotes));

      dispatch(addNote(updatedCategories.concat(categoryWithNotes)));
      console.log(updatedCategories, 'a new note added');
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('addNewNote action Error', error);
      throw new Error(error);
    }
  };
};

export const updateExistingNote = (
  categories: BaseCategoryEntry[],
  category: BaseCategoryEntry,
  editedNote: BaseNoteEntry
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const parsedNoteEntry = toNewNoteEntry(editedNote);

      // filter the note that we are updating
      const notesToUpdate = category.notes.filter(note => note.id !== parsedNoteEntry.id);
      const updatedNotes = notesToUpdate.concat(parsedNoteEntry);
      const categoryWithNotes: BaseCategoryEntry = {
        ...category,
        notes: updatedNotes
      };

      const updatedCategories = categories.filter(category => category.id !== categoryWithNotes.id);

      await setStorage('storedData', updatedCategories.concat(categoryWithNotes));

      dispatch(updateNote(updatedCategories.concat(categoryWithNotes)));
      console.log(updatedCategories, 'a new note added');
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('addNewNote action Error', error);
      throw new Error(error);
    }
  };
};

export const deleteExistingNote = (
  categories: BaseCategoryEntry[],
  category: BaseCategoryEntry,
  checkedIdValues: Checked[]
) => {
  return async (dispatch: AppDispatch) => {
    try {
      // delete selected notes based on their matching ids that are stored in checkbox state
      const ids = checkedIdValues.map(item => item.id);
      const updatedNotes = category.notes.filter(note => !ids.includes(note.id));
      const categoryWithNotes: BaseCategoryEntry = {
        ...category,
        notes: updatedNotes
      };

      const updatedCategories = categories.filter(category => category.id !== categoryWithNotes.id);

      await setStorage('storedData', updatedCategories.concat(categoryWithNotes));

      dispatch(updateNote(updatedCategories.concat(categoryWithNotes)));
    } catch (err) {
      const error = parseError(err);

      dispatch(setNotificationMessage({
        type: 'ERROR',
        content: error
      }, 5));

      console.error('deletExistingCategory action Error', error);
      throw new Error(error);
    }
  };
};

export const categoryReducer = categorySlice.reducer;