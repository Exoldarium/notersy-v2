import { Link } from 'react-router-dom';

import CategoryStyles from './styles/CategoryStyles';

import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import { addChecked, updateChecked } from '../reducers/checkboxReducer';
import { parseToString } from '../utils/parseData';

interface Props {
  category: BaseCategoryEntry
}

const CategoryList = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const setActiveOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    const updatedCategory = {
      ...categoryToUpdate,
      active: true
    };

    dispatch(updateChecked([])); // clear active checkbox id's from state
    void dispatch(updateExistingCategory(updatedCategory));
  };

  const setChecboxChecked = (e: React.MouseEvent<HTMLInputElement>) => {
    // the ids will be stored or filtered from the state depending if they are checked or not
    if (e.currentTarget.checked) {
      const checked = {
        id: parseToString(e.currentTarget.id)
      };

      dispatch(addChecked(checked));
    } else {
      dispatch(updateChecked(checkbox.filter(item => item.id !== e.currentTarget.id)));
    }
  };

  console.log(checkbox);

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
          onClick={setChecboxChecked}
        />
      </form>
    </>
  );
};

export default CategoryList;
