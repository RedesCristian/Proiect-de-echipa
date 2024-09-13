import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import SharedLayout from './SharedLayout/SharedLayout';
import Notify from './common/Notify/Notify';

import RestrictedLoginPage from 'pages/LoginPage/RestrictedLoginPage';
import RestrictedRegisterPage from 'pages/RegisterPage/RestrictedRegisterPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('pages/HomePage/RestrictedHomePage'));
const StatisticsPage = lazy(() =>
  import('pages/StatisticsPage/RestrictedStatisticsPage')
);
const CurrencyPage = lazy(() =>
  import('pages/CurrencyPage/RestrictedCurrencyPage')
);

const App = () => {
  const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RestrictedLoginPage />} />
          <Route path="/register" element={<RestrictedRegisterPage />} />

          <Route path="/dashboard" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            {isOnMobile && <Route path="currency" element={<CurrencyPage />} />}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Notify />
    </>
  );
};

export default App;
