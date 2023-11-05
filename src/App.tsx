import { useEffect, useState } from 'react';
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

// TODO: 
// add a button that will resize the popup when notes are active, redisign category display
// TODO:
// choose appropriate license
// TODO:
// add a back to top button
// TODO:
// component testing
// TODO: improve comments

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    /* width: 750px;
    min-height: 350px; */
    /* height: fit-content; */
    width: 375px;
    height: 600px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding-bottom: 0.5rem;
  }
`;

export const App = () => {
  const [sortCategories, setSortCategories] = useState('default');
  const [sortNotes, setSortNotes] = useState('default');
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const message = useAppSelector(({ message }) => {
    if (message && message.type === 'ERROR') {
      return message.content;
    }

    return null;
  });
  const dispatch = useAppDispatch();
  const match = useMatch('/:id');

  console.log(message, 'message here');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  // match the route param with a category id, return a message it the note couldn't be found
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id))
    :
    null;

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
          setSortNotes={setSortNotes}
          sortNotes={sortNotes}
        /> :
        <Nav
          setSortCategories={setSortCategories}
          sortCategories={sortCategories}
        />
      }
      {message && <Notification />}
      <Routes>
        <Route path="/:id" element={
          singleCategory &&
          <SingleCategory
            sortNotes={sortNotes}
            singleCategory={singleCategory}
          />
        }
        />
        {activeCategory ?
          <Route path="/" element={
            <SingleCategory
              sortNotes={sortNotes}
              singleCategory={activeCategory}
            />
          }
          /> :
          <Route path="/" element={
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {((): JSX.Element[] => {
                switch (sortCategories) {
                  case 'added':
                    const sortByDateAdded = categories
                      .slice()
                      .sort((a, b) => b.unixTimeAdded - a.unixTimeAdded);

                    return sortByDateAdded.map((category) => (
                      <CategoryList category={category} key={category.id} />
                    ));
                  case 'modified':
                    const sortByDateModified = categories
                      .slice()
                      .sort((a, b) => b.unixTimeModified - a.unixTimeModified);

                    return sortByDateModified.map((category) => (
                      <CategoryList category={category} key={category.id} />
                    ));
                  default:
                    const sortMostRecentLast = categories
                      .slice()
                      .sort((a, b) => a.unixTimeAdded - b.unixTimeAdded);

                    return sortMostRecentLast.map((category) => (
                      <CategoryList category={category} key={category.id} />
                    ));
                }
              })()}
            </ul>
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