import {PropsWithChildren} from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';

type PrivateProvideProps = PropsWithChildren<{
  authorizationStatus: string;
}>;

function PrivateRoute({children, authorizationStatus}: PrivateProvideProps): JSX.Element {


  return (
    <div>
      {authorizationStatus === AuthorizationStatus.Authorize ?
        children :
        <Navigate to={AppRoute.Login}/>}
    </div>
  );
}

export default PrivateRoute;
