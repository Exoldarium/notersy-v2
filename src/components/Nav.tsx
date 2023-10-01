/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory } from '../reducers/categoryReducer';
import { BaseCategoryEntry } from '../types';
import NavStyles from './styles/NavStyles';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../store';
import { setStorage } from '../services/storageService';

const Nav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories: BaseCategoryEntry[] = useSelector(({ categories }) => {
    return categories;
  });
  const id = uuidv4();

  const addCategoryOnClick = () => {
    const newEntry: BaseCategoryEntry = {
      id,
      title: 'Category entry',
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