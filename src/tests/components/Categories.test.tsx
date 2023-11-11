import { describe, expect, it, test } from "vitest";
import { renderWithProviders } from "../test-utils";
import { Categories } from "../../components/Categories";
import { store } from "../../store";
import { addCategory, setCategories } from "../../reducers/categoryReducer";
import { act } from "react-dom/test-utils";
import { Nav } from "../../components/Nav";
import { useState } from "react";
import { Sorting } from "../../types";

const mockCategories = [
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
  },
  {
    id: '1234',
    active: true,
    title: 'Another Category',
    dateAdded: 'Sat Oct 07 2023 18:36:08',
    unixTimeAdded: 1696749517,
    dateModified: 'Sat Oct 08 2023 18:36:08',
    unixTimeModified: 1696749520,
    notes: []
  }
];

describe('<Categories />', () => {
  const CategoriesWrapper = () => {
    const [sortCategories, setSortCategories] = useState<Sorting>('default');

    return <Categories sortCategories={sortCategories} setSortCategories={setSortCategories} />;
  };

  it('renders correct information if there are no categories present', () => {
    const render = renderWithProviders(<CategoriesWrapper />, { store });

    act(() => {
      render.store.dispatch(setCategories([]));
    });

    const { container } = renderWithProviders(<CategoriesWrapper />, { store });

    expect(container).toHaveTextContent('This is Notersy!');
  });

  it('renders categories correctly', () => {
    const render = renderWithProviders(<CategoriesWrapper />, { store });

    act(() => {
      render.store.dispatch(setCategories(mockCategories));
    });

    const { container } = renderWithProviders(<CategoriesWrapper />, { store });

    expect(container).toHaveTextContent('New Category');
    expect(container).toHaveTextContent('Another Category');
  });

  test('new categories can be added', () => {
    const Wrapper = () => {
      const [sortCategories, setSortCategories] = useState<Sorting>('default');

      return (
        <>
          <Nav setSortCategories={setSortCategories} sortCategories={sortCategories} />
          <CategoriesWrapper />
        </>
      );
    };

    const render = renderWithProviders(<Wrapper />, { store });
    act(() => {
      render.store.dispatch(setCategories(mockCategories));
    });
    act(() => {
      const categoryToAdd = {
        id: '5123253',
        active: true,
        title: 'Added Category',
        dateAdded: 'Sat Oct 07 2023 18:36:08',
        unixTimeAdded: 1696749517,
        dateModified: 'Sat Oct 08 2023 18:36:08',
        unixTimeModified: 1696749520,
        notes: []
      };

      render.store.dispatch(addCategory(categoryToAdd));
    });

    const { container } = renderWithProviders(<Wrapper />, { store });

    expect(container).toHaveTextContent('Added Category');
  });
}); 