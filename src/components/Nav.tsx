import { NavStyles } from './styles/NavStyles';
import { addNewCategory, deleteExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { useState } from 'react';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import { Sorting } from '../types';
import * as Icon from 'react-bootstrap-icons';
import { setStorage } from '../services/storageService';

interface Props {
  setSortCategories: React.Dispatch<React.SetStateAction<Sorting>>;
  sortCategories: Sorting;
}

export const Nav = ({ setSortCategories }: Props) => {
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

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(categories, checkbox));
    dispatch(updateCheckedId([]));
  };

  const clearStorageOnClick = async () => {
    if (window.confirm('This will clear all your saved notes, are you sure you want to proceed?')) {
      await setStorage('storedData', []);
      dispatch(updateCheckedId([]));
    }
  };

  return (
    <NavStyles $checkbox={checkbox}>
      <div className="headerDiv">
        <h1>Notersy</h1>
        {checkbox[0] && <p>{checkbox.length} selected</p>}
      </div>
      <div className="navButtons">
        {checkbox[0] &&
          <button
            type="button"
            onClick={deleteCheckedCategoriesOnClick}
            className="newCategory-button"
            data-testid="delete-category-test"
          >
            <span className="tooltiptext">Delete</span>
            <Icon.Trash />
          </button>
        }
        <button
          type="button"
          onClick={addNewCategoryOnClick}
        >
          <span className="tooltiptext">Create</span>
          <Icon.FolderPlus />
        </button>
      </div>
      <div className="navDropdown" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdown(!dropdown)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          data-testid="navDropdown-test"
        >
          <Icon.ThreeDots />
        </button>
        {dropdown &&
          <div className="dropdown-menu" onClick={() => setDropdown(!dropdown)}>
            <button
              type="button"
              onClick={() => setSortCategories('added')}
              className="dropDownButton"
            >
              Sort by date added
            </button>
            <button
              type="button"
              name="dateModified"
              onClick={() => setSortCategories('modified')}
              className="dropDownButton"
            >
              Sort by last modified
            </button>
            <span style={{ borderBottom: '1px solid black' }}></span>
            <button
              type="button"
              onClick={clearStorageOnClick}
              className="dropDownButton"
            >
              Clear storage
            </button>
          </div>
        }
      </div>
    </NavStyles>
  );
};