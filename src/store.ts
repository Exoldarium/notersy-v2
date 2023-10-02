import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';

export const store = configureStore({
  reducer: {
    categories: categoryReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;