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

  const changeActiveOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    categoryToUpdate.active = true;
    console.log(categoryToUpdate);

    void dispatch(updateExistingCategory(categoryToUpdate));
  };

  return (
    <Link to={`/${category.id}`}>
      <CategoryStyles id={category.id} onClick={changeActiveOnClick}>
        {category.title}
      </CategoryStyles>
    </Link>
  );
};

export default CategoryList;
