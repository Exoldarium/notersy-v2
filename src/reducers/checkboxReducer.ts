import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Checked } from '../types';

const initialState: Checked[] = [];

// controls checkboxes, i'm tracking which of the checkboxes are checked
// the unique id's of each of the checked categories are added or removed from the state
// depending if they are checked or not
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