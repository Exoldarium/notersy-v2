import { describe, expect, it } from "vitest";
import { store } from "../../../store";
import { setNotificationMessage } from "../../../reducers/messageReducer";
import { renderWithProviders } from "../../test-utils";
import { Notification } from "../../../components/Notification";
import { screen } from '@testing-library/react';

describe('<Notification />', () => {
  it('renders correctly', () => {
    store.dispatch(setNotificationMessage({
      type: "ERROR",
      content: 'test content'
    }, 5));

    renderWithProviders(<Notification />, { store });

    expect(screen.getByText('test content')).toBeInTheDocument();
  });
});