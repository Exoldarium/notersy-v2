import { createGlobalStyle } from 'styled-components';
import CategoryList from './components/CategoryList';
import Nav from './components/Nav';
import { useEffect } from 'react';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { Route, Routes, useMatch } from 'react-router-dom';
import { toNewCategoryEntry } from './utils/parseStorageEntry';
import SingleCategory from './components/SingleCategory';

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
  // TODO: add a message reducer and a message component that will deal with the null return
  // it could just print a message that there's no category with that id and rerender all of the categories
  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id)) :
    null;

  // check if there's an active category
  const findCategory = categories.filter(entry => entry.active);

  console.log('App', categories);
  console.log('findCategory', findCategory);

  return (
    <>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/:id" element={<SingleCategory singleCategory={singleCategory} />} />
        {findCategory[0] ?
          <Route path="/" element={<SingleCategory singleCategory={findCategory[0]} />} /> :
          <Route path="/" element={<div style={{ display: 'flex', flexDirection: 'column' }}>
            {categories.map((category) => (
              <CategoryList category={category} key={category.id} />
            ))}
          </div>} />
        }
      </Routes>
    </>
  );
};

export default App;
