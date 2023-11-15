import { useEffect, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Nav } from './components/Nav';
import { NoteList } from './components/NoteList';
import { Notification } from './components/Notification';
import { CategoryNav } from './components/CategoryNav';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { CategoryList } from './components/CategoryList';
import { Sorting } from './types';

// TODO:
// choose appropriate license
// TODO:
// add a back to top button
// TODO: improve comments
// TODO:
// add a way to download notes
// TODO:
// add options page

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
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
  button {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  } 
  a {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  const topRef = useRef<null | HTMLDivElement>(null);

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

  console.log('height', screen.height);
  console.log('inner', window.innerHeight);
  console.log('App', categories);

  return (
    <>
      <GlobalStyles />
      <div ref={topRef}></div>
      {activeCategory ?
        <CategoryNav
          singleCategory={activeCategory}
          setSortNotes={setSortNotes}
        /> :
        <Nav setSortCategories={setSortCategories} />
      }
      {message && <Notification />}
      <Routes>
        <Route path="/:id" element={
          singleCategory &&
          <NoteList
            sortNotes={sortNotes}
            singleCategory={singleCategory}
            setSortNotes={setSortNotes}
          />
        }
        />
        {activeCategory ?
          <Route path="/" element={
            <NoteList
              sortNotes={sortNotes}
              singleCategory={activeCategory}
              setSortNotes={setSortNotes}
            />
          }
          /> :
          <Route path="/" element={
            <CategoryList
              sortCategories={sortCategories}
              setSortCategories={setSortCategories}
              topRef={topRef}
            />
          }
          />
        }
      </Routes>
    </>
  );
};