import { useNavigate } from 'react-router-dom';

import NavStyles from './styles/NavStyles';

import { BaseCategoryEntry } from '../types';
import { addNewCategory, updateExistingCategory } from '../reducers/categoryReducer';
import { setStorage } from '../services/storageService';
import { useAppDispatch } from '../hooks/useReduxTypes';

interface Props {
  findActiveCategory: BaseCategoryEntry | null;
}

const Nav = ({ findActiveCategory }: Props) => {
  const dispatch = useAppDispatch();
  // const categories = useAppSelector(({ categories }) => {
  //   return categories;
  // });
  const navigate = useNavigate();

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  const clearStorageOnClick = async () => await setStorage('storedData', []);

  const setActiveToFalse = () => {
    if (findActiveCategory) {
      const updatedCategory = {
        ...findActiveCategory,
        active: false
      };

      void dispatch(updateExistingCategory(updatedCategory));
      navigate('/');
    }
  };

  console.log(findActiveCategory, 'active category');

  return (
    <NavStyles>
      <h1>Route Title</h1>
      {!findActiveCategory &&
        <>
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={addNewCategoryOnClick}
          >
            Create
          </button>
          <button
            type="button"
            style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
            onClick={clearStorageOnClick}
          >
            Clear
          </button>
        </>
      }
      {findActiveCategory &&
        <button
          type="button"
          style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
          onClick={setActiveToFalse}
        >
          Back
        </button>
      }
    </NavStyles>
  );
};

export default Nav;