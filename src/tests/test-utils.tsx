import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { PropsWithChildren, ReactElement } from "react";
import { categoryReducer } from "../reducers/categoryReducer";
import { messageReducer } from "../reducers/messageReducer";
import { checkboxReducer } from "../reducers/checkboxReducer";
import { editorActiveReducer } from "../reducers/editorActiveReducer";
import { clickedNoteReducer } from "../reducers/clickedNoteReducer";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "../store";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: ToolkitStore
}

// create a custom render function with our provider and store
export const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {
      categories: [],
      message: {
        type: '',
        content: ''
      },
      checkbox: [],
      editorActive: false,
      clickedNote: ""
    },
    store = configureStore({
      reducer: {
        categories: categoryReducer,
        message: messageReducer,
        checkbox: checkboxReducer,
        editorActive: editorActiveReducer,
        clickedNote: clickedNoteReducer
      },
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    return <Provider store={store}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};