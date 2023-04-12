import Header from 'components/Header/Header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <Suspense fallback={<h1>LOADING...</h1>}>
      <Header />
      <Outlet />
    </Suspense>
  );
};

export default SharedLayout;
