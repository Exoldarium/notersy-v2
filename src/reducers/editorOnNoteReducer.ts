import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// controls if the editor is shown on the note that is being edited
// i'm using this in order to prevent two instances of editors being active at the same time
const editorOnNoteReducerSlice = createSlice({
  name: 'editorOnNote',
  initialState: false,
  reducers: {
    setEditorOnNote(_, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

export const {
  setEditorOnNote
} = editorOnNoteReducerSlice.actions;

export const editorOnNoteReducer = editorOnNoteReducerSlice.reducer;