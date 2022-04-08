import {Outlet, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';


function Layout(): JSX.Element {
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
    <div className={`page ${classNames}`.trim()}>
      <Outlet/>
    </div>
  );
}

export default Layout;
