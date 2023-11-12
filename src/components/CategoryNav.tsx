import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCategoryEntry, Sorting } from '../types';
import { deleteExistingNote, updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { useForm } from '../hooks/useForm';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { setClickedNote } from '../reducers/clickedNoteReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';
import { useDetectOutsideClick } from '../hooks/useDetectOutsideClick';
import { CategoryNavStyles } from './styles/CategoryNavStyles';
import * as Icon from 'react-bootstrap-icons';

interface Props {
  singleCategory: BaseCategoryEntry;
  setSortNotes: React.Dispatch<React.SetStateAction<Sorting>>;
}

export const CategoryNav = ({ singleCategory, setSortNotes }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useDetectOutsideClick(() => {
    setDropdown(false);
  });
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });
  const { inputs, handleInputs } = useForm(singleCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      active: false
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    dispatch(updateCheckedId([]));
    navigate('/');
  };

  const updateTitleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      title: inputs.title,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    setEditTitle(false);
  };

  const setEditorActiveOnClick = () => {
    dispatch(setClickedNote('')); // close any notes that are being edited
    dispatch(setEditorActive(true));
  };

  const deleteCheckedNotesOnClick = () => {
    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    void dispatch(deleteExistingNote(categories, singleCategory, checkbox));
    dispatch(updateCheckedId([]));
  };

  console.log(singleCategory, 'active category');

  return (
    <CategoryNavStyles>
      {!editTitle && (editorActive || clickedNote) && <h1>{singleCategory.title}</h1>}
      {/* editNav buttons are hidden if the note editor is active */}
      <div style={{ display: editorActive || clickedNote ? 'none' : 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {!editTitle &&
            <button
              type="button"
              style={{ height: 'fit-content', width: 'fit-content' }}
              onClick={setActiveCategoryToFalse}
            >
              <Icon.ArrowLeft />
            </button>
          }
          {!editTitle && <h1>{singleCategory.title}</h1>}
          {editTitle &&
            <form onSubmit={updateTitleOnClick}>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleInputs}
              />
              <button type="submit">Submit</button>
            </form>
          }
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content' }}
            onClick={changeEditTitleOnClick}
          >
            {editTitle ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content' }}
          onClick={setEditorActiveOnClick}
        >
          New note
        </button>
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
                onClick={() => setSortNotes('added')}
                className="dropDownButton"
              >
                Sort by date added
              </button>
              <button
                type="button"
                name="dateModified"
                onClick={() => setSortNotes('modified')}
                className="dropDownButton"
              >
                Sort by last modified
              </button>
              <span style={{ borderBottom: '1px solid black' }}></span>
              <a
                href="mailto:shandoo91@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need help? Send me an e-mail
              </a>
              <a
                href="https://ko-fi.com/dusan36845"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enjoying the extension? Donate!
              </a>
              <a
                href="https://github.com/Exoldarium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check my github
              </a>
              <span style={{ borderBottom: '1px solid black' }}></span>
              <button
                type="button"
                // TODO:
                // onClick={clearStorageOnClick}
                className="dropDownButton"
              >
                Clear storage
              </button>
            </div>
          }
        </div>
        {checkbox[0] &&
          <>
            <button
              type="button"
              style={{ height: 'fit-content', width: 'fit-content' }}
              onClick={deleteCheckedNotesOnClick}
            >
              Delete
            </button>
            <p>{checkbox.length} selected</p>
          </>
        }
      </div>
    </CategoryNavStyles>
  );
};