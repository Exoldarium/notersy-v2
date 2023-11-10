import { NavStyles } from './styles/NavStyles';
import { addNewCategory, deleteExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { useState } from 'react';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import { Sorting } from '../types';
import * as Icon from 'react-bootstrap-icons';

interface Props {
  setSortCategories: React.Dispatch<React.SetStateAction<Sorting>>;
  sortCategories: Sorting;
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

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(categories, checkbox));
    dispatch(updateCheckedId([]));
  };

  return (
    <NavStyles>
      <div className="headerDiv">
        <h1>Notersy</h1>
        {checkbox[0] && <p>{checkbox.length} selected</p>}
      </div>
      <div className="navButtons">
        <button
          type="button"
          onClick={addNewCategoryOnClick}
        >
          <span className="tooltiptext">Create</span>
          <Icon.FolderPlus />
        </button>
        {checkbox[0] &&
          <button
            type="button"
            onClick={deleteCheckedCategoriesOnClick}
          >
            <span className="tooltiptext">Delete</span>
            <Icon.Trash />
          </button>
        }
      </div>
      <div className="navDropdown" ref={dropdownRef}>
        <p>
          Sorting by
        </p>
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
              data-testid="defaultDropdownTest"
            >
              default
            </button>
          </div>
        }
      </div>
    </NavStyles>
  );
};