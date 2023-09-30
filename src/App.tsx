/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createGlobalStyle } from 'styled-components';
import Category from './components/Category';
import Nav from './components/Nav';
import { BaseCategoryEntry } from './types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCategories } from './reducers/categoryReducer';
import { AppDispatch } from './store';

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
  const dispatch = useDispatch<AppDispatch>();
  const categories: BaseCategoryEntry[] = useSelector(({ categories }) => {
    return categories;
  });

  console.log('this has rendered');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  console.log({ app: categories });

  return (
    <>
      <GlobalStyles />
      <Nav />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category: BaseCategoryEntry) => (
          <Category category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
