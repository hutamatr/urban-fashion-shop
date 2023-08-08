import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@components/UI/Loading';

import './index.css';

import App from './App';
import { persistor, store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
