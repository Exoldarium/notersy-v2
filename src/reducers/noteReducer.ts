import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { BaseNoteEntry } from '../types';
import { AppDispatch } from '../store';
import { getDate } from '../utils/helpers';
import { toNewNoteEntry } from '../utils/parseStorageEntry';
import { parseStorage, setStorage } from '../services/storageService';

const initialState: BaseNoteEntry[] = [];

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<BaseNoteEntry>) {
      state.push(action.payload);
    }
  }
});

export const {
  addNote
} = noteSlice.actions;

export const addNewNote = (id: string, content: string) => {
  return async (dispatch: AppDispatch) => {
    const { storedData } = await parseStorage('storedData');

    const newEntry: BaseNoteEntry = {
      id: uuidv4(),
      active: true,
      title: 'New Category',
      date: getDate(),
      unixTime: Date.now(),
      content,
    };

    const parsedNoteEntry = toNewNoteEntry(newEntry);
    const categoryToAdTo = storedData.find(category => category.id === id);

    if (!categoryToAdTo) return null;

    // append the note to a correct category
    const categoryWithNotesAdded = categoryToAdTo.notes.concat(parsedNoteEntry);
    categoryToAdTo.notes = categoryWithNotesAdded;

    await setStorage('storedData', storedData);
    dispatch(addNote(parsedNoteEntry));
  };
};

export default noteSlice.reducer;