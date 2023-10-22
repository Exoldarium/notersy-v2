import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

// controls clicked notes, the string is note id
const clickedNoteReducerSlice = createSlice({
  name: 'clickedNote',
  initialState,
  reducers: {
    setClickedNote(_, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

export const {
  setClickedNote
} = clickedNoteReducerSlice.actions;

export const clickedNoteReducer = clickedNoteReducerSlice.reducer;