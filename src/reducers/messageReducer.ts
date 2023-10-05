import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message } from '../types';
import { AppDispatch } from '../store';

const initialState: Message[] = [];

const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<Message>) {
      state.push(action.payload);
    }
  }
});

export const {
  setMessage
} = messageReducer.actions;

export const setNotificationMesage = (message: Message) => {
  return (dispatch: AppDispatch) => {
    void dispatch(setMessage(message));
  };
};

export default messageReducer.reducer;