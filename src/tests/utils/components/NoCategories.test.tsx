import { describe, expect, it } from "vitest";
import { store } from "../../../store";
import { initializeCategories } from "../../../reducers/categoryReducer";
import { screen } from '@testing-library/react';
import { renderWithProviders } from "../../test-utils";
import { NoCategories } from "../../../components/NoCategories";

describe('<NoCategories />', () => {
  it('renders correctly if there are no categories', () => {
    renderWithProviders(<NoCategories categories={[]} />, { store });

    expect(screen.getByText('This is Notersy!')).toBeInTheDocument();
  });

  it('it doesnt render if there are categories present', async () => {
    await store.dispatch(initializeCategories());
    const { categories } = store.getState();

    renderWithProviders(<NoCategories categories={categories} />, { store });

    const notersy = screen.queryByText('This is Notersy!');
    expect(notersy).toBeNull();
  });
});