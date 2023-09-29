import { createGlobalStyle } from 'styled-components';
import Category from './components/Category';
import Nav from './components/Nav';
import useStorage from './services/useStorage';
import { BaseCategoryEntry } from './types';

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
  const { clientData } = useStorage();

  console.log('this has rendered');

  // useEffect(() => {
  //   void (async () => {
  //     const res = await getStorage('notes');

  //     void setClientData(res);
  //   })();
  // }, [setClientData]);

  const map: BaseCategoryEntry[] = [];
  console.log({ app: clientData });

  return (
    <>
      <GlobalStyles />
      <Nav />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {map.map(category => (
          <Category category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
