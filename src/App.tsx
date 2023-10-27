import { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';
import { CategoryList } from './components/CategoryList';
import { Nav } from './components/Nav';
import { SingleCategory } from './components/SingleCategory';
import { Notification } from './components/Notification';
import { CategoryNav } from './components/CategoryNav';
import { addNewCategory, initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { setNotificationMesage } from './reducers/messageReducer';

// TODO: 
// add a button that will resize the popup when notes are active, redisign category display
// TODO:
// choose appropriate license
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

export const App = () => {
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const dispatch = useAppDispatch();
  const match = useMatch('/:id');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  // shallow copy categories using slice and sort them 
  // const sortedCategories = categories
  //   .slice()
  //   .sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);

  // match the route param with a category id, return a message it the note couldn't be found
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id))
    :
    dispatch(setNotificationMesage({
      type: 'ERROR',
      content: 'Invalid note'
    }));

  // check if there's an active category, the category that the user has selected
  const activeCategory = categories.find(entry => entry.active);

  const addNewCategoryOnClick = () => dispatch(addNewCategory(categories));

  console.log('App', categories);

  return (
    <>
      <GlobalStyles />
      {activeCategory ?
        <CategoryNav
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
            categories.map((category) => (
              <CategoryList category={category} key={category.id} />
            ))
          }
          />
        }
      </Routes>
      {categories.length === 0 &&
        <div>
          <p>This is Notersy!</p>
          <p>Create a category to start!</p>
          <button
            type="button"
            onClick={addNewCategoryOnClick}
          >
            Create
          </button>
        </div>
      }
    </>
  );
};