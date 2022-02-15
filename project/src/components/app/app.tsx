import MainPage from '../../pages/main-page/main-page';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import LoginPage from '../../pages/login-page/login-page';
import Layout from '../layout/layout';
import PrivateRoute from '../../hooks/private-route/private-route';

type AppProps = {
  placeCounter: number;
}

function App({placeCounter}: AppProps): JSX.Element {
  const location = useLocation();
  let classNames = '';

  switch (location.pathname) {
    case AppRoute.Root: {
      classNames = 'page--gray page--main';
      break;
    }
    case AppRoute.Offer: {
      classNames = '';
      break;
    }
    case AppRoute.Login: {
      classNames = 'page--gray page--login';
      break;
    }
    case AppRoute.Favorites: {
      classNames = '';
      break;
    }
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout classNames={classNames}/>}>
        <Route
          path={AppRoute.Root}
          element={<MainPage placeCounter={placeCounter} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NotAuthorize}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<PropertyPage/>}
        >
          <Route path={':id'} element={<PropertyPage/>}/>
        </Route>
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path='*'
          element={<NotFoundPage/>}
        />
      </Route>
    </Routes>
  );
}

export default App;
