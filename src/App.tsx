import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';

import { CategoryList } from './components/CategoryList';
import { CategoryStyles } from './components/styles/CategoryStyles';
import { Nav } from './components/Nav';
import { SingleCategory } from './components/SingleCategory';
import { Notification } from './components/Notification';
import { EditNav } from './components/EditNav';

import { addNewCategory, initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { setNotificationMesage } from './reducers/messageReducer';

// TODO: 
// add a button that will resize the popup when notes are active, redisign category display

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    /* width: 750px;
    min-height: 350px;
    height: fit-content; */
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

  // shallow copy categories using slice and sort them 
  const sortedCategories = categories.slice().sort((a, b) => a.unixTime - b.unixTime);

  // match the route param with a category id, return a message it the note couldn't be found
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id))
    :
    dispatch(setNotificationMesage({
      type: 'ERROR',
      content: 'Invalid note'
    }));

  // check if there's an active category
  const activeCategory = categories.find(entry => entry.active);

  const addNewCategoryOnClick = () => dispatch(addNewCategory(categories));

  console.log('App', categories);

  return (
    <>
      <GlobalStyles />
      {activeCategory ?
        <EditNav
          singleCategory={activeCategory}
        /> :
        <Nav />
      }
      <Routes>
        <Route path="/:id" element={
          singleCategory ?
            <SingleCategory
              singleCategory={singleCategory}
            /> :
            <Notification />
        }
        />
        {activeCategory ?
          <Route path="/" element={
            <SingleCategory
              singleCategory={activeCategory}
            />
          }
          /> :
          <Route path="/" element={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {sortedCategories.map((category) => (
                <CategoryList category={category} key={category.id} />
              ))}
            </div>
          }
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
        </CategoryStyles>
      }
    </>
  );
};

export default App;
