import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavStyles } from './styles/NavStyles';
import { BaseCategoryEntry } from '../types';
import { deleteExistingNote, updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { useForm } from '../hooks/useForm';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { setClickedNote } from '../reducers/clickedNoteReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';

interface Props {
  singleCategory: BaseCategoryEntry;
  setSortNotes: React.Dispatch<React.SetStateAction<string>>;
  sortNotes: string;
}

export const CategoryNav = ({ singleCategory, setSortNotes, sortNotes }: Props) => {
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
    <NavStyles>
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
              Back
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
        <p>
          Sorting by
        </p>
        <div className="navDropdown">
          <button
            type="button"
            onClick={() => setDropdown(!dropdown)}
          >
            {sortNotes}
          </button>
          {dropdown &&
            <div onClick={() => setDropdown(!dropdown)} style={{ zIndex: 2 }}>
              <button
                type="button"
                onClick={() => setSortNotes('added')}
                className="dropDownButton"
              >
                added
              </button>
              <button
                type="button"
                name="dateModified"
                onClick={() => setSortNotes('modified')}
                className="dropDownButton"
              >
                modified
              </button>
              <button
                type="button"
                name="dateModified"
                onClick={() => setSortNotes('default')}
                className="dropDownButton"
              >
                default
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
    </NavStyles>
  );
};