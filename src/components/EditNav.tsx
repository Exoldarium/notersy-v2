import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { Dispatch, SetStateAction, useState } from 'react';

import { BaseCategoryEntry } from '../types';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch } from '../hooks/useReduxTypes';

import useForm from '../hooks/useForm';

interface Props {
  activeCategory: BaseCategoryEntry;
  setNoteEditorActive: Dispatch<SetStateAction<boolean>>;
  noteEditorActive: boolean;
}

const EditNav = ({ activeCategory, setNoteEditorActive, noteEditorActive }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const { inputs, handleInputs } = useForm(activeCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditTitleOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory = {
      ...activeCategory,
      active: false
    };

    void dispatch(updateExistingCategory(updatedCategory));
    navigate('/');
  };

  const updateTitleOnClick = () => {
    const updatedCategory = {
      ...activeCategory,
      title: inputs.title
    };

    void dispatch(updateExistingCategory(updatedCategory));
  };

  const setNoteEditorActiveOnClick = () => setNoteEditorActive(!noteEditorActive);

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
          {noteEditorActive ? 'Cancel' : 'New note'}
        </button>
      </div>
    </NavStyles>
  );
};

export default EditNav;