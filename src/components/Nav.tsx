import { clearStorage } from '../services/storageService';
import useStorage from '../services/useStorage';
import { BaseCategoryEntry } from '../types';
import NavStyles from './styles/NavStyles';

// interface Props {
//   setCategories: React.Dispatch<React.SetStateAction<BaseCategoryEntry[]>>
//   categories: BaseCategoryEntry[]
// }

const Nav = () => {
  const { addNewCategory } = useStorage();

  const addCategoryOnClick = () => {
    const newEntry: BaseCategoryEntry = {
      id: 1,
      title: 'Category entry',
      notes: []
    };
    addNewCategory(newEntry);
    // setCategories(categories.concat({
    //   id: 1,
    //   title: 'Category title',
    //   notes: []
    // }));
  };

  const clearStorageOnClick = async () => {
    await clearStorage();
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
        onClick={clearStorageOnClick}
      >
        Clear
      </button>
    </NavStyles>
  );
};

export default Nav;