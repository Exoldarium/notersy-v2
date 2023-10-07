import NavStyles from './styles/NavStyles';

import { addNewCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch } from '../hooks/useReduxTypes';

const Nav = () => {
  const dispatch = useAppDispatch();

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  const clearStorageOnClick = async () => await setStorage('storedData', []);

  return (
    <NavStyles>
      <>
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
      </>
    </NavStyles>
  );
};

export default Nav;