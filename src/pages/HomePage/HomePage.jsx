import ListTrip from 'components/ListTrip/ListTrip';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectToken } from 'redux/auth/authSelectors';

const HomePage = () => {
  const isAuth = useSelector(selectToken);
  console.log(isAuth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' && !isAuth) {
      navigate('login');
    }
  }, [isAuth, location.pathname, navigate]);
  return <>{isAuth ? <ListTrip /> : navigate('login')}</>;
};

export default HomePage;
