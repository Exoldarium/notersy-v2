import { createGlobalStyle } from 'styled-components';
import CategoryList from './components/CategoryList';
import Nav from './components/Nav';
import { useEffect } from 'react';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';
import { Route, Routes, useMatch } from 'react-router-dom';
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
  const match = useMatch('categories/:id');

  console.log(match);

  // if (match) {
  //   const findCategory: BaseCategoryEntry = categories.filter(category => category.id === match.params.id);
  // }


  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="categories/:id" element={<SingleCategory />} />
      </Routes>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category) => (
          <CategoryList category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
