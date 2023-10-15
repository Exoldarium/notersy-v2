import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const editorActiveSlice = createSlice({
  name: 'editorActive',
  initialState: false,
  reducers: {
    setEditorActive(_, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

export const {
  setEditorActive
} = editorActiveSlice.actions;

export default editorActiveSlice.reducer;