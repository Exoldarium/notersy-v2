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
    addCheckedId(state, action: PayloadAction<Checked>) {
      state.push(action.payload);
    },
    updateCheckedId(_, action: PayloadAction<Checked[]>) {
      return action.payload;
    }
  }
});

export const {
  addCheckedId,
  updateCheckedId
} = checkboxSlice.actions;

export const checkboxReducer = checkboxSlice.reducer;