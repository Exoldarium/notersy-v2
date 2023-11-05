import { NavStyles } from './styles/NavStyles';
import { addNewCategory, deleteExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { useState } from 'react';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';

interface Props {
  setSortCategories: React.Dispatch<React.SetStateAction<string>>;
  sortCategories: string;
}

export const Nav = ({ setSortCategories, sortCategories }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useDetectOutsideClick(() => {
    setDropdown(false);
  });
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
      <div style={{ display: 'flex' }}>
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
        <p>
          Sorting by
        </p>
        <div className="navDropdown" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdown(true)}
          >
            {sortCategories}
          </button>
          {dropdown &&
            <div onClick={() => setDropdown(!dropdown)} style={{ zIndex: 2 }}>
              <button
                type="button"
                onClick={() => setSortCategories('added')}
                className="dropDownButton"
              >
                added
              </button>
              <button
                type="button"
                name="dateModified"
                onClick={() => setSortCategories('modified')}
                className="dropDownButton"
              >
                modified
              </button>
              <button
                type="button"
                name="dateModified"
                onClick={() => setSortCategories('default')}
                className="dropDownButton"
              >
                default
              </button>
            </div>
          }
        </div>
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