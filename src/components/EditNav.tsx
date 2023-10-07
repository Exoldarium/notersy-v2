import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { updateExistingCategory } from '../reducers/categoryReducer';
import { useAppDispatch } from '../hooks/useReduxTypes';
import { useState } from 'react';
import useForm from '../hooks/useForm';

interface Props {
  activeCategory: BaseCategoryEntry;
}

const EditNav = ({ activeCategory }: Props) => {
  const [editTitle, setEditTitle] = useState(false);
  const { inputs, handleInputs } = useForm(activeCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeEditActiveOnClick = () => setEditTitle(!editTitle);

  const setActiveCategoryToFalse = () => {
    const updatedCategory = {
      ...activeCategory,
      active: false
    };

    void dispatch(updateExistingCategory(updatedCategory));
    navigate('/');
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
          <form>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputs}
            />
          </form>
        }
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={changeEditActiveOnClick}
        >
          {editTitle ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </NavStyles>
  );
};

export default EditNav;