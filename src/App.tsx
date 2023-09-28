import { createGlobalStyle } from 'styled-components';
import Category from './components/Category';
import Nav from './components/Nav';
import useStorage from './services/useStorage';

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
  const { getStorageData } = useStorage();

  // useEffect(() => {
  //   function start() {
  //     async () => {
  //       await getData();
  //     };
  //   }
  //   start();
  // });
  console.log({ app: getStorageData });

  return (
    <>
      <GlobalStyles />
      <Nav />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {getStorageData.map(category => (
          <Category category={category} />
        ))}
      </div>
    </>
  );
};

export default App;
