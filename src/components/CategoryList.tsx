import { useAppSelector } from "../hooks/useReduxTypes";
import { Sorting } from "../types";
import { SingleCategory } from "./SingleCategory";
import { NoCategories } from "./NoCategories";
import { CategorySortingStyles } from "./styles/CategoryStyles";

interface Props {
  sortCategories: Sorting;
  setSortCategories: React.Dispatch<React.SetStateAction<Sorting>>;
}

export const CategoryList = ({ sortCategories, setSortCategories }: Props) => {
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });

  if (categories.length === 0) {
    return (
      <>
        <NoCategories categories={categories} />
      </>
    );
  } else {
    return (
      <>
        {sortCategories !== 'default' &&
          <CategorySortingStyles>
            <p style={{ fontSize: '13px', margin: '0.4rem 0 0 0.4rem' }}>
              {sortCategories === 'added' ?
                `Sorting by date ${sortCategories}` : `Sorting by last ${sortCategories}`
              }
            </p>
            <button
              type="button"
              onClick={() => setSortCategories('default')}
              data-testid="close-sorting"
            >
              x
            </button>
          </CategorySortingStyles>
        }
        <ul style={{ listStyle: 'none', padding: 0, position: 'relative' }}>
          {((): JSX.Element[] => {
            switch (sortCategories) {
              case 'added':
                const sortByDateAdded = categories
                  .slice()
                  .sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);

                return sortByDateAdded.map((category) => (
                  <SingleCategory category={category} key={category.id} />
                ));
              case 'modified':
                const sortByDateModified = categories
                  .slice()
                  .sort((a, b) => b.unixTimeModified - a.unixTimeModified);

                return sortByDateModified.map((category) => (
                  <SingleCategory category={category} key={category.id} />
                ));
              default:
                const sortMostRecentLast = categories
                  .slice()
                  .sort((a, b) => a.unixTimeAdded - b.unixTimeAdded);

                return sortMostRecentLast.map((category) => (
                  <SingleCategory category={category} key={category.id} />
                ));
            }
          })()}
        </ul>
      </>
    );
  }
};