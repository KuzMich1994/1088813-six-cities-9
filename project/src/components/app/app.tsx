import MainPage from '../../pages/main-page/main-page';
import { Routes, Route} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import LoginPage from '../../pages/login-page/login-page';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import PropertyContent from '../property-content/property-content';
import {useCallback, useState} from 'react';
import {useAppSelector} from '../../hooks';
import Spinner from '../spinner/spinner';
import {isCheckedAuth} from '../../utils/common';


function App(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<null | number>(null);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  const changeIsActive = (id: number) => {
    setActiveOfferId(id);
  };

  const removeActiveId = () => {
    setActiveOfferId(null);
  };

  const handleChangeIsActive = useCallback(
    (id: number) => {
      changeIsActive(id);
    },
    [],
  );

  const handleRemoveActiveId = useCallback(
    () => {
      removeActiveId();
    },
    [],
  );

  if (!isDataLoaded || isCheckedAuth(authorizationStatus)) {
    return (
      <Spinner/>
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout/>}>
        <Route
          path={AppRoute.Root}
          element={
            <MainPage
              changeIsActive={handleChangeIsActive}
              removeActiveId={handleRemoveActiveId}
              activeOfferId={activeOfferId}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<PropertyPage/>}
        >
          <Route path={':id'} element={
            <PropertyContent
              activeId={activeOfferId}
              changeIsActive={changeIsActive}
              removeActiveId={removeActiveId}
            />
          }
          />
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
