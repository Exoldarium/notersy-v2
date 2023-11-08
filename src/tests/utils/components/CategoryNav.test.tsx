import { useState } from "react";
import { describe, expect, it } from "vitest";
import { CategoryNav } from "../../../components/CategoryNav";
import { renderWithProviders } from "../../test-utils";
import { BaseCategoryEntry } from "../../../types";
import { store } from '../../../store';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

const singleCategoryMock: BaseCategoryEntry =
{
  id: '123',
  active: true,
  title: 'New Category',
  dateAdded: 'Sat Oct 07 2023 18:36:08',
  unixTimeAdded: 1696749517,
  dateModified: 'Sat Oct 08 2023 18:36:08',
  unixTimeModified: 1696749520,
  notes: [
    {
      id: '321',
      title: 'New note',
      dateAdded: 'Sat Oct 08 2023 18:36:08',
      unixTimeAdded: 1696749515,
      content: 'some content',
      dateModified: 'Sat Oct 08 2023 18:36:08',
      unixTimeModified: 1696749520,
      url: ''
    },
    {
      id: '4321',
      title: 'another note',
      dateAdded: 'Sat Oct 09 2023 18:36:08',
      unixTimeAdded: 1696749514,
      content: 'some other content',
      dateModified: 'Sat Oct 08 2023 18:36:08',
      unixTimeModified: 1696749520,
      url: ''
    }
  ]
};

// TODO:
// add button testing when they are finished

describe('<CategoryNav />', () => {
  it('renders correctly', () => {
    const Wrapper = () => {
      const [sortNotes, setSortNotes] = useState('default');
      // const [editTitle, setEditTitle] = useState(false);
      // const [dropdown, setDropdown] = useState(false);

      return <CategoryNav
        sortNotes={sortNotes}
        setSortNotes={setSortNotes}
        singleCategory={singleCategoryMock}
      />;
    };

    renderWithProviders(<Wrapper />, { store });

    expect(screen.getByText('default')).toBeInTheDocument();
    screen.debug();
  });
  it('changes sorting information correctly on click', async () => {
    const Wrapper = () => {
      const [sortNotes, setSortNotes] = useState('default');

      return <CategoryNav
        sortNotes={sortNotes}
        setSortNotes={setSortNotes}
        singleCategory={singleCategoryMock}
      />;
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