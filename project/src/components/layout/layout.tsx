import React from 'react';
import {Outlet} from 'react-router-dom';

type LayoutProps = {
  classNames: string;
}

function Layout({classNames}: LayoutProps): JSX.Element {

  return (
    <div className={`page ${classNames}`.trim()}>
      <Outlet/>
    </div>
  );
}

export default Layout;
