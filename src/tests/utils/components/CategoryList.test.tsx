import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../test-utils";
import { CategoryList } from "../../../components/CategoryList";
import { store } from '../../../store';
import { screen } from '@testing-library/react';
import { addNewCategory } from "../../../reducers/categoryReducer";

describe('<CategoryList />', () => {
  test('new category is added and rendered correctly', async () => {
    await store.dispatch(addNewCategory([]));
    const { categories } = store.getState();

    expect(categories).toHaveLength(1);
    expect(categories[0].active).toBe(true);

    renderWithProviders(<CategoryList category={categories[0]} />, { store });

    expect(screen.getByText('New Category')).toBeInTheDocument();
  });
});