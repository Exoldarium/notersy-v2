import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { addNewCategory, updateExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { getDate } from '../utils/helpers';
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
  const id = uuidv4();

  const addCategoryOnClick = () => {
    const newEntry: BaseCategoryEntry = {
      id,
      active: true,
      title: 'New Category',
      date: getDate(),
      notes: []
    };

    void dispatch(addNewCategory(newEntry));
    console.log(categories, 'a new category added');
  };

  const clearStorage = async () => {
    await setStorage('storedData', []);
  };

  const setActiveToFalse = () => {
    const categoryToUpdate = toNewCategoryEntry(categories.find(entry => entry.active));
    const updatedCategory = {
      ...categoryToUpdate,
      active: false
    };

    void dispatch(updateExistingCategory(updatedCategory));
    navigate('/');
  };

  console.log(findActive);

  return (
    <NavStyles>
      <h1>Route Title</h1>
      {!findActive &&
        <>
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={addCategoryOnClick}
          >
            Create
          </button>
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={clearStorage}
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