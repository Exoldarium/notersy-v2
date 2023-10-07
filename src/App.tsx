import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';

import CategoryList from './components/CategoryList';
import CategoryStyles from './components/styles/CategoryStyles';
import Nav from './components/Nav';
import SingleCategory from './components/SingleCategory';
import Notification from './components/Notification';

import { addNewCategory, initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { setNotificationMesage } from './reducers/messageReducer';
import EditNav from './components/EditNav';

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
  const sortedCategories = categories.slice().sort((a, b) => a.unixTime - b.unixTime);
  const match = useMatch('/:id');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  // match the route param with a category id, return a message it the note couldn't be found
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id))
    :
    void dispatch(setNotificationMesage({
      type: 'ERROR',
      content: 'Invalid note'
    }));

  // check if there's an active category
  const activeCategory = categories.find(entry => entry.active);

  const addNewCategoryOnClick = () => void dispatch(addNewCategory());

  console.log('App', categories);

  return (
    <>
      <GlobalStyles />
      {activeCategory ? <EditNav activeCategory={activeCategory} /> : <Nav />}
      <Routes>
        <Route path="/:id" element={singleCategory ?
          <SingleCategory singleCategory={singleCategory} /> :
          <Notification />
        }
        />
        {activeCategory ?
          <Route path="/" element={<SingleCategory singleCategory={activeCategory} />} /> :
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
