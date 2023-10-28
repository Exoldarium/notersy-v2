import { NavStyles } from './styles/NavStyles';
import { addNewCategory, deleteExistingCategory, sortCategories } from '../reducers/categoryReducer';
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
          onClick={() => dispatch(sortCategories('dateAdded'))}
        >
          Sort by date added
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          name="dateModified"
          onClick={() => dispatch(sortCategories('dateModified'))}
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