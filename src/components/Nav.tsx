import NavStyles from './styles/NavStyles';

import { addNewCategory, deleteExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateCheckedId } from '../reducers/checkboxReducer';

const Nav = () => {
  const dispatch = useAppDispatch();
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });

  const addNewCategoryOnClick = () => {
    void dispatch(addNewCategory());
    void dispatch(updateCheckedId([])); // update checkedIds state
  };

  const clearStorageOnClick = async () => {
    await setStorage('storedData', []);
    void dispatch(updateCheckedId([]));
  };

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(checkbox));
    void dispatch(updateCheckedId([]));
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