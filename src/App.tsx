import { useEffect, useRef, useState } from 'react';
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
import { useNavVisible } from './hooks/useNavVisible';
import { ScrollToTopButtonStyles } from './components/styles/ScrollToTopButtonStyles';
import { ChevronUp } from 'react-bootstrap-icons';
import { AppGlobalStyles } from './components/styles/GlobalStyles';

// TODO:
// choose appropriate license
// TODO:
// add a way to download notes

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
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
  });
  const dispatch = useAppDispatch();
  const match = useMatch('/:id');
  const topRef = useRef<null | HTMLDivElement>(null);
  const navVisible = useNavVisible(topRef);

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

  const scrollToTopOnClick = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log('App', categories);

  return (
    <>
      <AppGlobalStyles />
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
            />
          }
          />
        }
      </Routes>
      {!navVisible && !editorActive && clickedNote === '' &&
        <ScrollToTopButtonStyles
          type="button"
          onClick={scrollToTopOnClick}
        >
          <ChevronUp />
        </ScrollToTopButtonStyles>
      }
    </>
  );
};