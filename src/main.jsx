import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import { store, persistor } from './store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
