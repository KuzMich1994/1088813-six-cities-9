import React, {SyntheticEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {store} from '../../store';
import {logoutAction} from '../../store/async-actions';
import {setAvatarUrl, setUserEmail} from '../../store/action';
import UserProfile from './-user-profile/user-profile';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <UserProfile/>
              </li>
              <li className="header__nav-item">
                <a onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  dispatch(logoutAction());
                  navigate(AppRoute.Login);
                  store.dispatch(setUserEmail(null));
                  store.dispatch(setAvatarUrl(null));
                }} className="header__nav-link" href="/signOut"
                >
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
