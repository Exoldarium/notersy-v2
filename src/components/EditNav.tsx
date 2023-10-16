import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';

import useForm from '../hooks/useForm';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { setEditorOnNote } from '../reducers/editorOnNoteReducer';

interface Props {
  activeCategory: BaseCategoryEntry;
}

const EditNav = ({ activeCategory }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const { inputs, handleInputs } = useForm(activeCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory = {
      ...activeCategory,
      active: false
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    dispatch(setEditorActive(false));
    navigate('/');
  };

  const updateTitleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedCategory = {
      ...activeCategory,
      title: inputs.title
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    setEditTitle(false);
  };

  const setNoteEditorActiveOnClick = () => {
    dispatch(setEditorActive(!editorActive));
    dispatch(setEditorOnNote(false)); // sets any notes that are being edited to false, closing the editor that's active on them
  };

  console.log(activeCategory, 'active category');

  return (
    <NavStyles>
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
          {editorActive ? 'Cancel' : 'New note'}
        </button>
      </div>
    </NavStyles>
  );
};

export default EditNav;