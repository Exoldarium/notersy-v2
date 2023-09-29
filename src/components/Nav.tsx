import useStorage from '../services/useStorage';
import { BaseCategoryEntry } from '../types';
import NavStyles from './styles/NavStyles';
import { v4 as uuidv4 } from 'uuid';


const Nav = () => {
  const { addNewCategory, clearStorage } = useStorage();
  const id = uuidv4();

  const addCategoryOnClick = async () => {
    const newEntry: BaseCategoryEntry = {
      id,
      title: 'Category entry',
      notes: []
    };
    await addNewCategory(newEntry);
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