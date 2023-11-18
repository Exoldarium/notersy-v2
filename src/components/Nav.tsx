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

    if (checkbox[0]) {
      dispatch(updateCheckedId([]));
    }
  };

  const deleteCheckedCategoriesOnClick = () => {
    void dispatch(deleteExistingCategory(categories, checkbox));
    dispatch(updateCheckedId([]));
  };

  return (
    <NavStyles $checkbox={checkbox}>
      <div className="headerDiv">
        <h1>
          Notersy <span>v2.0.0</span>
        </h1>
      </div>
      <div className="trash-button-div">
        {checkbox[0] &&
          <>
            <p>{checkbox.length} selected</p>
            <button
              type="button"
              onClick={deleteCheckedCategoriesOnClick}
              className="newCategory-button"
              data-testid="delete-category-test"
            >
              <span className="tooltiptext">Delete</span>
              <Icon.Trash />
            </button>
          </>
        }
      </div>
      <div className="newCategory-button-div">
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
            <a
              href="https://github.com/Exoldarium/notersy-v2/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a problem
            </a>
            <a
              href="https://ko-fi.com/dusan36845"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy me a coffee!
            </a>
            <span style={{ borderBottom: '1px solid black' }}></span>
            <a
              href="options.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Options
            </a>
          </div>
        }
      </div>
    </NavStyles>
  );
};