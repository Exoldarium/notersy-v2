import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import { Categories } from "../../components/Categories";
import { store } from "../../store";
import { setCategories } from "../../reducers/categoryReducer";
import { act } from "react-dom/test-utils";

const mockCategory = [
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
  it('renders correct information if there are no categories present', () => {
    const render = renderWithProviders(<Categories sortCategories="default" />, { store });

    act(() => {
      render.store.dispatch(setCategories([]));
    });

    const { container } = renderWithProviders(<Categories sortCategories="default" />, { store });

    expect(container).toHaveTextContent('This is Notersy!');
  });
  it('renders categories correctly', () => {
    const render = renderWithProviders(<Categories sortCategories="default" />, { store });

    act(() => {
      render.store.dispatch(setCategories(mockCategory));
    });

    const { container } = renderWithProviders(<Categories sortCategories="default" />, { store });

    expect(container).toHaveTextContent('New Category');
    expect(container).toHaveTextContent('Another Category');
  });
}); 