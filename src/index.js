import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

const App = lazy(() => import('./components/App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/project-test">
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
