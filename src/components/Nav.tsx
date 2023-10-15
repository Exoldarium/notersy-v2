import NavStyles from './styles/NavStyles';

import { addNewCategory, deleteExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateChecked } from '../reducers/checkboxReducer';

const Nav = () => {
  const dispatch = useAppDispatch();
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const addNewCategoryOnClick = () => {
    void dispatch(addNewCategory());
    dispatch(updateChecked([])); // update checkedIds state
  };

  const clearStorageOnClick = async () => {
    await setStorage('storedData', []);
    dispatch(updateChecked([]));
  };

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(checkbox));
    dispatch(updateChecked([]));
  };

  return (
    <NavStyles>
      <h1>Notersy</h1>
      <button
        type="button"
        style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
        onClick={addNewCategoryOnClick}
      >
        Create
      </button>
      <button
        type="button"
        style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
        onClick={clearStorageOnClick}
      >
        Clear
      </button>
      <button
        type="button"
        style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
        onClick={deleteCheckedCategoriesOnClick}
      >
        Delete
      </button>
    </NavStyles>
  );
};

export default Nav;