import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { MemoryRouter } from 'react-router-dom';
import { OptionsPage } from './components/OptionsPage.tsx';
import { OptionsGlobalstyles } from './components/styles/GlobalStyles.tsx';
// import './index.css';

ReactDOM.createRoot(document.getElementById('options')!).render(
  <Provider store={store}>
    <MemoryRouter>
      <OptionsGlobalstyles />
      <OptionsPage />
    </MemoryRouter>
  </Provider>
);