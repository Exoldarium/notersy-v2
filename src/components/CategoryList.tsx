import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import CategoryStyles from './styles/CategoryStyles';
import { Link } from 'react-router-dom';

interface Props {
  category: BaseCategoryEntry
}

const CategoryList = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });

  const setActiveOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    const updatedCategory = {
      ...categoryToUpdate,
      active: true
    };

    void dispatch(updateExistingCategory(updatedCategory));
  };

  return (
    <Link to={`/${category.id}`}>
      <CategoryStyles id={category.id} onClick={setActiveOnClick}>
        {category.title}
      </CategoryStyles>
    </Link>
  );
};

export default CategoryList;
