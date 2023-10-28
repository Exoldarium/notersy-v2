import { Link } from 'react-router-dom';
import { CategoryStyles } from './styles/CategoryStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import { setChecboxChecked, updateCheckedId } from '../reducers/checkboxReducer';

interface Props {
  category: BaseCategoryEntry
}

export const CategoryList = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const setCategoryActiveOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    const updatedCategory: BaseCategoryEntry = {
      ...categoryToUpdate,
      active: true
    };

    dispatch(updateCheckedId([])); // clear active checkbox id's from state
    void dispatch(updateExistingCategory(categories, updatedCategory));
  };

  const getCheckedIdOnClick = (
    e: React.MouseEvent<HTMLInputElement>
  ) => dispatch(setChecboxChecked(e, checkbox, category.id));

  console.log(checkbox);

  return (
    <ul style={{ display: 'flex', flexDirection: 'row', listStyle: 'none', padding: 0 }}>
      <CategoryStyles onClick={setCategoryActiveOnClick} id={category.id}>
        <Link to={`/${category.id}`}>
          {category.title}
        </Link>
      </CategoryStyles>
      {/* TODO: move form into the categoryStyles */}
      <form>
        <input
          type="checkbox"
          id={category.id}
          name="checked"
          onClick={getCheckedIdOnClick}
        />
      </form>
    </ul>
  );
};
