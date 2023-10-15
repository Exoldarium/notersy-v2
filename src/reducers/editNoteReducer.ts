import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const editNoteReducerSlice = createSlice({
  name: 'editNote',
  initialState: false,
  reducers: {
    setEditNote(_, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

export const {
  setEditNote
} = editNoteReducerSlice.actions;

export default editNoteReducerSlice.reducer;