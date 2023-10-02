import { createGlobalStyle } from 'styled-components';
import CategoryList from './components/CategoryList';
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
  const dispatch = useAppDispatch();
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  // const match = useMatch('categories/:id');

  // const singleCategory = match ? categories.find(category => category.id === match.params.id) : null;
  // const parsedEntry = toNewCategoryEntry(singleCategory);

  useEffect(() => {
    void dispatch(initializeCategories());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Nav />
      {/* <Routes>
        <Route path="categories/:id" element={<SingleCategory singleCategory={parsedEntry} />} />
      </Routes> */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((category) => (
          <CategoryList category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
