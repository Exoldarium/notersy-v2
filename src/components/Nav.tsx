import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { addNewCategory, updateExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { toNewCategoryEntry } from '../utils/parseStorageEntry';

interface Props {
  findActive: BaseCategoryEntry | null;
}

const Nav = ({ findActive }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const navigate = useNavigate();

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  const clearStorageOnClick = async () => await setStorage('storedData', []);

  const setActiveToFalse = () => {
    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.active));
    const updatedCategory = {
      ...categoryToUpdate,
      active: false
    };

    void dispatch(updateExistingCategory(updatedCategory));
    navigate('/');
  };

  return (
    <NavStyles>
      <h1>Route Title</h1>
      {!findActive &&
        <>
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
      }
      {findActive &&
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={setActiveToFalse}
        >
          Back
        </button>
      }
    </NavStyles>
  );
};

export default Nav;