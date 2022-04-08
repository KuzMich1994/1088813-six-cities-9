import s from './style.module.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className={`page page--gray ${s.root}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <div className={`${s.notFound}`}>
            <h1 className={`${s.notFoundTitle}`}>Error 404</h1>
            <span className={`${s.notFoundSubtitle}`}>Page is not found</span>
            <span className={`${s.notFoundSubtitle}`}>Please return to <Link to='/' className={`${s.notFoundLink}`}>home page</Link></span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
