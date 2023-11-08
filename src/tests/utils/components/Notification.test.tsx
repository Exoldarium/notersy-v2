import { describe, expect, it } from "vitest";
import { store } from "../../../store";
import { setMessage } from "../../../reducers/messageReducer";
import { renderWithProviders } from "../../test-utils";
import { Notification } from "../../../components/Notification";
import { act } from "react-dom/test-utils";

describe('<Notification />', () => {
  it('renders correctly', () => {
    const redux = renderWithProviders(<Notification />, { store });

    act(() => {
      redux.store.dispatch(setMessage({
        type: "ERROR",
        content: 'test error'
      }));
    });

    const { container } = renderWithProviders(<Notification />, { store });

    expect(container).toHaveTextContent('test error');
  });
});