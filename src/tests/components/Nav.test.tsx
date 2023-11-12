import { describe, expect, it } from "vitest";
import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";
import { Nav } from "../../components/Nav";
import { store } from '../../store';
import { useState } from "react";
import { Sorting } from "../../types";

describe('<Nav />', () => {
  it('renders correct information', () => {
    const Wrapper = () => {
      const [, setSortCategories] = useState<Sorting>('default');

      return <Nav setSortCategories={setSortCategories} />;
    };

    renderWithProviders(<Wrapper />, { store });

    expect(screen.getByText('Notersy')).toBeInTheDocument();
  });
});