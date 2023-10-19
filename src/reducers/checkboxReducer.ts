import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Checked } from '../types';
import { parseToString } from '../utils/parseData';
import { AppDispatch } from '../store';

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

export const setChecboxChecked = (
  e: React.MouseEvent<HTMLInputElement>,
  checkbox: Checked[]
) => {
  return (dispatch: AppDispatch) => {
    // the ids will be stored or filtered from the state depending if they are checked or not
    if (e.currentTarget.checked) {
      const checked = {
        id: parseToString(e.currentTarget.id)
      };

      dispatch(addCheckedId(checked));
    } else {
      dispatch(updateCheckedId(checkbox.filter(item => item.id !== e.currentTarget.id)));
    }
  };
};

export const checkboxReducer = checkboxSlice.reducer;