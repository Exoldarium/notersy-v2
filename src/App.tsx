import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Nav } from './components/Nav';
import { SingleCategory } from './components/NoteList';
import { Notification } from './components/Notification';
import { CategoryNav } from './components/CategoryNav';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { Categories } from './components/Categories';
import { Sorting } from './types';

// TODO: 
// add a button that will resize the popup when notes are active, redisign category display
// TODO:
// choose appropriate license
// TODO:
// add a back to top button
// TODO:
// add a dropdown that will have our sorting, depending which sorting mode is clicked display an indicator next to it
// TODO: improve comments

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    /* width: 750px;
    min-height: 350px; */
    /* height: fit-content; */
    width: 375px;
    height: 600px;
    background-color: whitesmoke;
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding-bottom: 0.5rem;
  }
`;

export const App = () => {
  const [sortCategories, setSortCategories] = useState<Sorting>('default');
  const [sortNotes, setSortNotes] = useState<Sorting>('default');
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
          <Route path="/" element={<Categories sortCategories={sortCategories} />}
          />
        }
      </Routes>
    </>
  );
};