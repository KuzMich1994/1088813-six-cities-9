import {SyntheticEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/async-actions';
import UserProfile from './-user-profile/user-profile';
import {setUserData} from '../../store/user-process/user-process';

function Header(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

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
              {
                authorizationStatus === AuthorizationStatus.Authorize ?
                  <li className="header__nav-item">
                    <a onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      dispatch(logoutAction());
                      navigate(AppRoute.Login);
                      dispatch(setUserData(null));
                    }} className="header__nav-link" href="/signOut"
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li> :
                  null
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
