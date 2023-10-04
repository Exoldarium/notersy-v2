import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../types';
import { AppDispatch } from '../store';

const initialState: Notification = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_, action: PayloadAction<Notification>) {
      return action.payload;
    }
  }
});

export const {
  setNotification
} = notificationSlice.actions;

export const setNotificationMesage = (notification: Notification) => {
  return (dispatch: AppDispatch) => {
    void dispatch(setNotification(notification));
  };
};

export default notificationSlice.reducer;