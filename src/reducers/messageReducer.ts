import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Message } from '../types';
import { AppDispatch } from '../store';
import { parseError } from '../utils/parseData';

const initialState: Message = {
  type: '',
  content: ''
};

const messageReducer = createSlice({
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
} = messageReducer.actions;

export const setNotificationMesage = (message: Message) => {
  return (dispatch: AppDispatch) => {
    try {
      const newMessage = {
        type: message.type,
        content: message.content
      };

      dispatch(setMessage(newMessage));
    } catch (err) {
      const error = parseError(err);
      console.error('setNotificationMesage action Error', error);
      throw new Error(error);
    }
  };
};

export default messageReducer.reducer;