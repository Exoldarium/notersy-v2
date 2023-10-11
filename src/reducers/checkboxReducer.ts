import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
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

export const addCheckedId = (param: Checked) => {
  return (dispatch: AppDispatch) => {
    dispatch(addChecked(param));
  };
};

export const updateCheckedId = (param: Checked[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateChecked(param));
  };
};

export default checkboxSlice.reducer;