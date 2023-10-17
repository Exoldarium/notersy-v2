import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavStyles } from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';

import { useForm } from '../hooks/useForm';
import { setEditorActive } from '../reducers/editorActiveReducer';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const CategoryNav = ({ singleCategory }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const editorOnNote = useAppSelector(({ editorOnNote }) => {
    return editorOnNote;
  });
  const { inputs, handleInputs } = useForm(singleCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory = {
      ...singleCategory,
      active: false
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    dispatch(setEditorActive(false));
    navigate('/');
  };

  const updateTitleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCategory = {
      ...singleCategory,
      title: inputs.title
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    setEditTitle(false);
  };

  const setNoteEditorActiveOnClick = () => dispatch(setEditorActive(true));

  console.log(singleCategory, 'active category');

  return (
    <NavStyles>
      {!editTitle && <h1>{singleCategory.title}</h1>}
      {/* editNav buttons are hidden if the note editor is active */}
      <div style={{ display: editorActive || editorOnNote ? 'none' : 'flex', flexDirection: 'row' }}>
        {!editTitle &&
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={setActiveCategoryToFalse}
          >
            Back
          </button>
        }
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
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={changeEditTitleOnClick}
        >
          {editTitle ? 'Cancel' : 'Edit'}
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={setNoteEditorActiveOnClick}
        >
          New note
        </button>
      </div>
    </NavStyles>
  );
};