import React from 'react';
import {useAppSelector} from '../../../hooks';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const';

function UserProfile(): JSX.Element {
  const {userData} = useAppSelector((state) => state);

  return (
    userData && userData.name ?
      <Link className="header__nav-link header__nav-link--profile" to="/">
        <div className="header__avatar-wrapper user__avatar-wrapper">
          {
            userData.avatarUrl ?
              <img src={userData.avatarUrl} alt={userData.name} style={{borderRadius: '100%'}}/> :
              null
          }
        </div>
        <span className="header__user-name user__name">{userData.name}</span>
      </Link> :
      <Link to={AppRoute.Login} className={'header__nav-link'}>
        <span className={'header__user-name user__name'}>Login</span>
      </Link>
  );
}

export default UserProfile;
