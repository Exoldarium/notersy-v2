import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

const editorActiveSlice = createSlice({
  name: 'editorActive',
  initialState: false,
  reducers: {
    setActive(_, action: PayloadAction<boolean>) {
      return action.payload;
    }
  }
});

export const {
  setActive
} = editorActiveSlice.actions;

export const setEditorActive = (params: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(setActive(params));
  };
};

export default editorActiveSlice.reducer;