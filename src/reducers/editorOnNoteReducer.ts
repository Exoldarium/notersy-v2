import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// controls if the editor is shown on the note that is being edited
// i'm using this in order to prevent two instances of editors being active at the same time
const editNoteReducerSlice = createSlice({
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
} = editNoteReducerSlice.actions;

export default editNoteReducerSlice.reducer;