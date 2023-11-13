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

  const shortenCategoryTitle = singleCategory.title.slice(0, 10) + '...';

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      active: false
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));

    if (checkbox[0]) {
      dispatch(updateCheckedId([]));
    } else if (clickedNote) {
      dispatch(setClickedNote(''));
    } else if (editorActive) {
      dispatch(setEditorActive(false));
    } else if (editTitle) {
      setEditTitle(false);
    }

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
    if (clickedNote) {
      dispatch(setClickedNote(''));
    }

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
    <>
      {/* {!editTitle && (editorActive || clickedNote) &&
        <h1 style={{ fontSize: '15px', borderBottom: '1px solid black' }}>{singleCategory.title}</h1>
      } */}
      <CategoryNavStyles
        $editorActive={editorActive}
        $clickedNote={clickedNote}
        $checkbox={checkbox}
        $editTitle={editTitle}
      >
        {/* editNav buttons are hidden if the note editor is active */}
        <div className="title-edit">
          {!editTitle &&
            <button
              type="button"
              onClick={setActiveCategoryToFalse}
              className="back-button"
            >
              <span className="tooltiptext">Back</span>
              <Icon.ArrowLeft />
            </button>
          }
          {!editTitle &&
            <h1>
              {singleCategory.title.length >= 12 ?
                <>
                  <span className="tooltiptext">{singleCategory.title}</span>
                  {shortenCategoryTitle}
                </> :
                singleCategory.title
              }
            </h1>
          }
          {editTitle &&
            <form onSubmit={updateTitleOnClick}>
              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleInputs}
              />
              <button type="submit" className="confirm-edit-button">
                <Icon.Check />
              </button>
            </form>
          }
          <button
            type="button"
            onClick={changeEditTitleOnClick}
            className="editTitle-button"
          >
            {editTitle ? <Icon.X /> : <>
              <span className="tooltiptext">Edit</span>
              <Icon.Pencil />
            </>}
          </button>
        </div>
        <div className="categoryNav-NoteButtons">
          {checkbox[0] &&
            <>
              <p>{checkbox.length} selected</p>
              <button
                type="button"
                style={{ height: 'fit-content', width: 'fit-content' }}
                onClick={deleteCheckedNotesOnClick}
              >
                <span className="tooltiptext">Delete</span>
                <Icon.Trash />
              </button>
            </>
          }
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content' }}
            onClick={setEditorActiveOnClick}
          >
            <span className="tooltiptext">Create</span>
            <Icon.FolderPlus />
          </button>
        </div>
        <div className="categoryNavDropdown" ref={dropdownRef}>
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
                Buy me a coffee!
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
      </CategoryNavStyles>
    </>
  );
};