import MainPage from '../../pages/main-page/main-page';
import { Routes, Route} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import LoginPage from '../../pages/login-page/login-page';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import {Offer} from '../../types/offer';
import PropertyContent from '../property-content/property-content';
import {Comment} from '../../types/comment';
import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import Spinner from '../spinner/spinner';
import {isCheckedAuth} from '../../utils/common';

type AppProps = {
  offers: Offer[];
  comments: Comment[];
}

function App({offers, comments}: AppProps): JSX.Element {
  const {isDataLoaded, authorizationStatus} = useAppSelector((state) => state);
  const [activeOfferId, setActiveOfferId] = useState<null | number>(null);

  const changeIsActive = (id: number) => {
    setActiveOfferId(id);
  };

  const removeActiveId = () => {
    setActiveOfferId(null);
  };

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
              changeIsActive={changeIsActive}
              removeActiveId={removeActiveId}
              activeOfferId={activeOfferId}
            />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<PropertyPage/>}
        >
          <Route path={':id'} element={
            <PropertyContent
              comments={comments}
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
