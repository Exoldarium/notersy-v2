import { addNewCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import NavStyles from './styles/NavStyles';
import { v4 as uuidv4 } from 'uuid';
import { setStorage } from '../services/storageService';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { getDate } from '../utils/getDate';

const Nav = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const id = uuidv4();

  const addCategoryOnClick = () => {
    const newEntry: BaseCategoryEntry = {
      id,
      title: 'Category entry',
      date: getDate(),
      notes: []
    };
    void dispatch(addNewCategory(newEntry));

    console.log(categories, 'a new category added');
  };

  const clearStorage = async () => {
    await setStorage('storedData', []);
  };

  return (
    <NavStyles>
      <h1>Route Title</h1>
      <button
        type="button"
        style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
        onClick={addCategoryOnClick}
      >
        Create
      </button>
      <button
        type="button"
        style={{ height: 'fit-content', width: 'fit-content', margin: '0.7rem' }}
        onClick={clearStorage}
      >
        Clear
      </button>
    </NavStyles>
  );
};

export default Nav;