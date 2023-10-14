import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import messageReducer from './reducers/messageReducer';
import checkboxReducer from './reducers/checkboxReducer';
import noteReducer from './reducers/noteReducer';
import editorActiveReducer from './reducers/editorActiveReducer';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    message: messageReducer,
    checkbox: checkboxReducer,
    notes: noteReducer,
    editorActive: editorActiveReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;