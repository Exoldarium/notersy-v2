import { Link } from 'react-router-dom';
import { CategoryStyles } from './styles/CategoryStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';
import { setChecboxChecked, updateCheckedId } from '../reducers/checkboxReducer';

interface Props {
  category: BaseCategoryEntry;
}

export const SingleCategory = ({ category }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const setCategoryActiveOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.id === id));
    const updatedCategory: BaseCategoryEntry = {
      ...categoryToUpdate,
      active: true
    };

    if (checkbox[0]) {
      dispatch(updateCheckedId([]));
    }
    void dispatch(updateExistingCategory(categories, updatedCategory));
  };

  const getCheckedIdOnClick = (
    e: React.MouseEvent<HTMLInputElement>
  ) => dispatch(setChecboxChecked(e, checkbox, category.id));

  console.log(checkbox);

  return (
    <CategoryStyles>
      <form>
        <input
          type="checkbox"
          id={category.id}
          name="checked"
          onClick={getCheckedIdOnClick}
        />
      </form>
      <div onClick={setCategoryActiveOnClick} id={category.id}>
        <Link to={`/${category.id}`}>
          {category.title}
        </Link>
        <p>{category.notes.length !== 1 ? `${category.notes.length} notes` : `1 note`}</p>
      </div>
    </CategoryStyles>
  );
};
