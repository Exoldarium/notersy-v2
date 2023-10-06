import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { addNewCategory, updateExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch } from '../hooks/useReduxTypes';
import { useState } from 'react';

interface Props {
  activeCategory: BaseCategoryEntry | null;
}

const Nav = ({ activeCategory }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  const clearStorageOnClick = async () => await setStorage('storedData', []);

  const changeEditActiveOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    if (activeCategory) {
      const updatedCategory = {
        ...activeCategory,
        active: false
      };

      void dispatch(updateExistingCategory(updatedCategory));
      navigate('/');
    }
  };

  console.log(activeCategory, 'active category');

  return (
    <NavStyles>
      {!activeCategory &&
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
      }
      {activeCategory &&
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {!editTitle &&
            <button
              type="button"
              style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
              onClick={setActiveCategoryToFalse}
            >
              Back
            </button>
          }
          {!editTitle && <h1>{activeCategory.title}</h1>}
          {editTitle &&
            <form>
              <input type="text" name="title" />
            </form>
          }
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={changeEditActiveOnClick}
          >
            {editTitle ? 'Cancel' : 'Edit'}
          </button>
        </div>
      }
    </NavStyles>
  );
};

export default Nav;