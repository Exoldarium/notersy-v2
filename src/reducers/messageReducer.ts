import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types';
import { AppDispatch } from '../store';

const initialState: Message = {
  type: '',
  content: ''
};

// sets a message to be displayed to a user if there's a need for one
const messageReducerSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage(_, action: PayloadAction<Message>) {
      return action.payload;
    }
  }
});

export const {
  setMessage
} = messageReducerSlice.actions;

export const setNotificationMesage = (message: Message) => {
  return (dispatch: AppDispatch) => {
    const newMessage = {
      type: message.type,
      content: message.content
    };

    dispatch(setMessage(newMessage));
  };
};

export const messageReducer = messageReducerSlice.reducer;