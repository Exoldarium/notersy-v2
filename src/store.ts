import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from './reducers/categoryReducer';
import { messageReducer } from './reducers/messageReducer';
import { checkboxReducer } from './reducers/checkboxReducer';
import { editorActiveReducer } from './reducers/editorActiveReducer';
import { clickedNoteReducer } from './reducers/clickedNoteReducer';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    message: messageReducer,
    checkbox: checkboxReducer,
    editorActive: editorActiveReducer,
    clickedNote: clickedNoteReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;