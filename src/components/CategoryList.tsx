import { Link } from 'react-router-dom';

import CategoryStyles from './styles/CategoryStyles';

import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';

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

  const changeCheckedOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    const updatedCategory = {
      ...categoryToUpdate,
      checked: !categoryToUpdate.checked
    };

    void dispatch(updateExistingCategory(updatedCategory));
  };

  return (
    <>
      <Link to={`/${category.id}`}>
        <CategoryStyles id={category.id} onClick={setActiveOnClick}>
          {category.title}
        </CategoryStyles>
      </Link>
      <form>
        <input
          type="checkbox"
          id={category.id}
          name="checked"
          onClick={changeCheckedOnClick}
        />
      </form>
    </>
  );
};

export default CategoryList;
