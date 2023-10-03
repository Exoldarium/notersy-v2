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

  const singleCategory = match ?
    toNewCategoryEntry(categories.find(category => category.id === match.params.id)) :
    null;

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  console.log('App', categories);

  return (
    <>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/:id" element={<SingleCategory singleCategory={singleCategory} />} />
        <Route path="/" element={<div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories.map((category) => (
            <CategoryList category={category} key={category.id} />
          ))}
        </div>} />
      </Routes>
    </>
  );
};

export default App;
