import { useAppSelector } from "../hooks/useReduxTypes";
import { CategoryList } from "./CategoryList";

interface Props {
  sortCategories: string;
}

export const Categories = ({ sortCategories }: Props) => {
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {((): JSX.Element[] => {
        switch (sortCategories) {
          case 'added':
            const sortByDateAdded = categories
              .slice()
              .sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);

            return sortByDateAdded.map((category) => (
              <CategoryList category={category} key={category.id} />
            ));
          case 'modified':
            const sortByDateModified = categories
              .slice()
              .sort((a, b) => b.unixTimeModified - a.unixTimeModified);

            return sortByDateModified.map((category) => (
              <CategoryList category={category} key={category.id} />
            ));
          default:
            const sortMostRecentLast = categories
              .slice()
              .sort((a, b) => a.unixTimeAdded - b.unixTimeAdded);

            return sortMostRecentLast.map((category) => (
              <CategoryList category={category} key={category.id} />
            ));
        }
      })()}
    </ul>
  );
};