import { describe, expect, it, test } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";
import { Nav } from "../../components/Nav";
import { store } from '../../store';
import { useState } from "react";
import userEvent from '@testing-library/user-event';
import { Sorting } from "../../types";

// TODO:
// add button testing when they are finished

describe('<Nav />', () => {
  it('renders correct information', () => {
    const Wrapper = () => {
      const [sortCategories, setSortCategories] = useState<Sorting>('default');

      return <Nav setSortCategories={setSortCategories} sortCategories={sortCategories} />;
    };

    renderWithProviders(<Wrapper />, { store });

    expect(screen.getByText('Notersy')).toBeInTheDocument();
  });

  test('sorting information is changed on click', async () => {
    const Wrapper = () => {
      const [sortCategories, setSortCategories] = useState<Sorting>('default');

      return <Nav setSortCategories={setSortCategories} sortCategories={sortCategories} />;
    };

    renderWithProviders(<Wrapper />, { store });

    await userEvent.click(screen.getByTestId('navDropdown-test'));

    expect(screen.getByText('Sort by added')).toBeInTheDocument();
    expect(screen.getByText('Sort by modified')).toBeInTheDocument();

    // TODO: move this test to category testing because sorting information appears there
    // await userEvent.click(screen.getByText('Sort by added'));

    // expect(screen.getByText('Sorting by added')).toBeInTheDocument();
  });
});