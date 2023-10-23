import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavStyles } from './styles/NavStyles';
import { BaseCategoryEntry } from '../types';
import { deleteExistingNote, updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { useForm } from '../hooks/useForm';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { updateCheckedId } from '../reducers/checkboxReducer';
import { setNoteEditPropertyToFalse } from '../utils/helpers';

interface Props {
  singleCategory: BaseCategoryEntry;
}

export const CategoryNav = ({ singleCategory }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });
  const { inputs, handleInputs } = useForm(singleCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const categoryWithUpdatedNotes = setNoteEditPropertyToFalse(singleCategory);

    const updatedCategory = {
      ...categoryWithUpdatedNotes,
      active: false
    };

    void dispatch(updateExistingCategory(categories, updatedCategory));
    dispatch(updateCheckedId([]));
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

  const setEditorActiveOnClick = () => {
    // set any notes that are being edited to false
    const categoryWithUpdatedNotes = setNoteEditPropertyToFalse(singleCategory);

    void dispatch(updateExistingCategory(categories, categoryWithUpdatedNotes));
    dispatch(setEditorActive(true));
  };

  const deleteCheckedNotesOnClick = () => {
    void dispatch(deleteExistingNote(categories, singleCategory, checkbox));
    dispatch(updateCheckedId([]));
  };

  console.log(singleCategory, 'active category');

  return (
    <NavStyles>
      {!editTitle && <h1>{singleCategory.title}</h1>}
      {/* editNav buttons are hidden if the note editor is active */}
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
          onClick={setEditorActiveOnClick}
        >
          New note
        </button>
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={deleteCheckedNotesOnClick}
        >
          Delete
        </button>
      </div>
    </NavStyles>
  );
};