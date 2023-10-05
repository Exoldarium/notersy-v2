import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';

import CategoryList from './components/CategoryList';
import Nav from './components/Nav';
import SingleCategory from './components/SingleCategory';
import Notification from './components/Notification';
import CategoryStyles from './components/styles/CategoryStyles';

import { addNewCategory, initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    width: 375px;
    height: 600px;
    border: 1px solid black;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const App = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const match = useMatch('/:id');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  // match the route param with a category id
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id)) :
    null;

  // check if there's an active category
  const findActive = categories.find(entry => entry.active) || null;

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  console.log('App', categories.length);
  console.log('findCategory', findActive);

  return (
    <>
      <GlobalStyles />
      <Nav findActive={findActive} />
      <Routes>
        <Route path="/:id" element={singleCategory ?
          <SingleCategory singleCategory={singleCategory} /> :
          <Notification />}
        />
        {findActive ?
          <Route path="/" element={<SingleCategory singleCategory={findActive} />} /> :
          <Route path="/" element={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {categories.map((category) => (
                <CategoryList category={category} key={category.id} />
              ))}
            </div>}
          />
        }
      </Routes>
      {categories.length === 0 &&
        <CategoryStyles >
          <p>This is Notersy!</p>
          <p>Create a category to start!</p>
          <button
            type="button"
            onClick={addNewCategoryOnClick}
          >
            Create
          </button>
        </CategoryStyles>}
    </>
  );
};

export default App;
