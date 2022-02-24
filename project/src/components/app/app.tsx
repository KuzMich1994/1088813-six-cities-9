import MainPage from '../../pages/main-page/main-page';
import { Routes, Route} from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import PropertyPage from '../../pages/property-page/property-page';
import LoginPage from '../../pages/login-page/login-page';
import Layout from '../layout/layout';
import PrivateRoute from '../../hooks/private-route/private-route';
import {Offer} from '../../types/offer';
import PropertyContent from '../property-content/property-content';
import {Comment} from '../../types/comment';

type AppProps = {
  placeCounter: number;
  offers: Offer[];
  comments: Comment[];
}

function App({placeCounter, offers, comments}: AppProps): JSX.Element {

  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Layout/>}>
        <Route
          path={AppRoute.Root}
          element={<MainPage placeCounter={placeCounter} offers={offers} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            // <PrivateRoute authorizationStatus={AuthorizationStatus.NotAuthorize}>
            //   <FavoritesPage/>
            // </PrivateRoute>
            <FavoritesPage offers={offers}/>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<PropertyPage/>}
        >
          <Route path={':id'} element={<PropertyContent offers={offers} comments={comments}/>}/>
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
