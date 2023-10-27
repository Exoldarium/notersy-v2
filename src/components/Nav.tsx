import { NavStyles } from './styles/NavStyles';
import { addNewCategory, deleteExistingCategory, sortCategoriesByDateAdded, sortCategoriesByDateModified } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateCheckedId } from '../reducers/checkboxReducer';

export const Nav = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const addNewCategoryOnClick = () => {
    void dispatch(addNewCategory(categories));
    dispatch(updateCheckedId([])); // update checkedIds state
  };

  const clearStorageOnClick = async () => {
    await setStorage('storedData', []);
    dispatch(updateCheckedId([]));
  };

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(categories, checkbox));
    dispatch(updateCheckedId([]));
  };

  const sortByDateAddedOnClick = () => dispatch(sortCategoriesByDateAdded());

  const sortByDateModifiedOnClick = () => dispatch(sortCategoriesByDateModified());

  return (
    <NavStyles>
      <h1>Notersy</h1>
      <div style={{ display: 'block' }}>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          onClick={addNewCategoryOnClick}
        >
          Create
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          onClick={clearStorageOnClick}
        >
          Clear
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          onClick={sortByDateAddedOnClick}
        >
          Sort by date added
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          onClick={sortByDateModifiedOnClick}
        >
          Sort by date modified
        </button>
      </div>
      {checkbox[0] &&
        <>
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content' }}
            onClick={deleteCheckedCategoriesOnClick}
          >
            Delete
          </button>
          <p>{checkbox.length} selected</p>
        </>
      }
    </NavStyles>
  );
};