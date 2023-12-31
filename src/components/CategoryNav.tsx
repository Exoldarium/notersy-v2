import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCategoryEntry, BaseNoteEntry, Sorting } from '../types';
import { addNewNote, deleteExistingNote, updateExistingCategory, updateExistingNote } from '../reducers/categoryReducer';
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
  const noteContent = useAppSelector(({ noteContent }) => {
    return noteContent;
  });

  const dropdownRef = useDetectOutsideClick(() => {
    setDropdown(false);
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

    if (checkbox[0]) {
      dispatch(updateCheckedId([]));
    } else if (clickedNote) {
      const findNote = singleCategory.notes.find(n => n.id === clickedNote);

      if (!findNote) return null;

      const noteToUpdate: BaseNoteEntry = {
        ...findNote,
        content: noteContent,
        dateModified: getDate(),
        unixTimeModified: Date.now()
      };

      dispatch(setClickedNote(''));
      return void dispatch(updateExistingNote(categories, updatedCategory, noteToUpdate));
    } else if (editorActive) {
      dispatch(setEditorActive(false));
      return void dispatch(addNewNote(categories, updatedCategory, noteContent));
    } else if (editTitle) {
      setEditTitle(false);
    }

    void dispatch(updateExistingCategory(categories, updatedCategory));
    navigate('/');
  };

  const updateTitleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      title: inputs.title === '' ? 'New Category' : inputs.title,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    setEditTitle(false);
  };

  const setEditorActiveOnClick = () => {
    if (clickedNote) {
      const findNote = singleCategory.notes.find(note => note.id === clickedNote);

      if (!findNote) return null;

      const updatedCategory: BaseCategoryEntry = {
        ...singleCategory,
        dateModified: getDate(),
        unixTimeModified: Date.now()
      };

      const noteToUpdate: BaseNoteEntry = {
        ...findNote,
        content: noteContent,
        dateModified: getDate(),
        unixTimeModified: Date.now()
      };

      void dispatch(updateExistingNote(categories, updatedCategory, noteToUpdate));
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

    void dispatch(deleteExistingNote(categories, updatedCategory, checkbox));
    dispatch(updateCheckedId([]));
  };

  return (
    <>
      <CategoryNavStyles $checkbox={checkbox} $editTitle={editTitle}>
        <div className="title-edit">
          {!editTitle &&
            <>
              <button
                type="button"
                onClick={setActiveCategoryToFalse}
                className="back-button"
              >
                <span className="tooltiptext">Back</span>
                <Icon.ArrowLeft />
              </button>
              <h1 onClick={changeEditTitleOnClick}>
                {((): JSX.Element => {
                  switch (true) {
                    case (singleCategory.title.length >= 9 && checkbox[0] !== undefined):
                      return <>
                        <span className="tooltiptext">{singleCategory.title}</span>
                        <p>{singleCategory.title.slice(0, 9) + '...'}</p>
                      </>;
                    case (singleCategory.title.length >= 20):
                      return <>
                        <span className="tooltiptext">{singleCategory.title}</span>
                        <p>{singleCategory.title.slice(0, 20) + '...'}</p>
                      </>;
                    default:
                      return <p>{singleCategory.title}</p>;
                  }
                })()}
              </h1>
            </>
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
            {editTitle && <Icon.X />}
          </button>
        </div>
        <div className="trash-button-div">
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
        </div>
        <div className="newNote-button-div">
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
      </CategoryNavStyles>
    </>
  );
};