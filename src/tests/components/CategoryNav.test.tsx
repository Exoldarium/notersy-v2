import { useState } from "react";
import { describe, expect, it, test } from "vitest";
import { CategoryNav } from "../../components/CategoryNav";
import { renderWithProviders } from "../test-utils";
import { BaseCategoryEntry, Sorting } from "../../types";
import { store } from '../../store';
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

describe('<CategoryNav />', () => {
  it('renders correctly', () => {
    const Wrapper = () => {
      const [, setSortNotes] = useState<Sorting>('default');

      return <CategoryNav
        setSortNotes={setSortNotes}
        singleCategory={singleCategoryMock}
      />;
    };

    renderWithProviders(<Wrapper />, { store });

    expect(screen.getByText('New Category')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  test('sorting and removing sorting from categories displays correct information', async () => {
    const Wrapper = () => {
      const [, setSortNotes] = useState<Sorting>('default');

      return (
        <>
          <CategoryNav setSortNotes={setSortNotes} singleCategory={singleCategoryMock} />
        </>
      );
    };

    renderWithProviders(<Wrapper />, { store });

    await userEvent.click(screen.getByTestId('navDropdown-test'));

    expect(screen.getByText('Sort by date added')).toBeInTheDocument();
    expect(screen.getByText('Sort by last modified')).toBeInTheDocument();
  });
});