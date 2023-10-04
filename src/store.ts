import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import notificationReducer from './reducers/notificationReducer';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    notification: notificationReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;