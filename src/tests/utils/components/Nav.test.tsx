import { describe, expect, it } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithProviders } from "../../test-utils";
import { Nav } from "../../../components/Nav";
import { store } from '../../../store';
import { useState } from "react";
import userEvent from '@testing-library/user-event';

// TODO:
// add button testing when they are finished

describe('<Nav />', () => {
  it('renders correct information', () => {
    const Wrapper = () => {
      const [sortCategories, setSortCategories] = useState('default');

      return <Nav setSortCategories={setSortCategories} sortCategories={sortCategories} />;
    };

    renderWithProviders(<Wrapper />, { store });

    expect(screen.getByText('Notersy')).toBeInTheDocument();
    expect(screen.getByText('default')).toBeInTheDocument();
  });
  it('changes sorting information correctly on click', async () => {
    const Wrapper = () => {
      const [sortCategories, setSortCategories] = useState('default');

      return <Nav setSortCategories={setSortCategories} sortCategories={sortCategories} />;
    };

    renderWithProviders(<Wrapper />, { store });

    await userEvent.click(screen.getByText(/default/i));

    expect(screen.getByText(/added/i)).toBeInTheDocument();
    expect(screen.getByText(/modified/i)).toBeInTheDocument();
    expect(screen.getByTestId(/defaultDropdownTest/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/added/i));

    expect(screen.getByText(/added/i)).toBeInTheDocument();
  });
});