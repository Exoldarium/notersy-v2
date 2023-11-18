import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = '';

const noteContentSlice = createSlice({
  name: 'noteContent',
  initialState,
  reducers: {
    setNoteContent(_, action: PayloadAction<string>) {
      return action.payload;
    }
  }
});

export const { setNoteContent } = noteContentSlice.actions;

export const noteContentReducer = noteContentSlice.reducer;