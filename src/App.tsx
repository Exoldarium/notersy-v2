import { createGlobalStyle } from 'styled-components';
import Category from './components/Category';
import Nav from './components/Nav';
import { useEffect } from 'react';
import { initializeCategories } from './reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from './hooks/useReduxTypes';

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
  // TODO: try to use a content script that will be injected on every https page instead of using the popup
  // popup should only open the content page

  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });

  console.log(categories, 'this has rendered');

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Nav />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category) => (
          <Category category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
