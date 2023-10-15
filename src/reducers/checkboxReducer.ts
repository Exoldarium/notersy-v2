import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Checked } from '../types';

const initialState: Checked[] = [];

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState,
  reducers: {
    addChecked(state, action: PayloadAction<Checked>) {
      state.push(action.payload);
    },
    updateChecked(_, action: PayloadAction<Checked[]>) {
      return action.payload;
    }
  }
});

export const {
  addChecked,
  updateChecked
} = checkboxSlice.actions;

export default checkboxSlice.reducer;