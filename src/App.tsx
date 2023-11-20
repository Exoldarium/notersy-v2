import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { ChevronUp } from 'react-bootstrap-icons';
import { Nav } from './components/Nav';
import { NoteList } from './components/NoteList';
import { Notification } from './components/Notification';
import { CategoryNav } from './components/CategoryNav';
import { AppGlobalStyles } from './components/styles/GlobalStyles';
import { CategoryList } from './components/CategoryList';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import { Sorting } from './types';
import { useNavVisible } from './hooks/useNavVisible';
import { ScrollToTopButtonStyles } from './components/styles/ScrollToTopButtonStyles';

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

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id))
    :
    null;

  const activeCategory = categories.find(entry => entry.active); // check if a category has been selected

  const scrollToTopOnClick = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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