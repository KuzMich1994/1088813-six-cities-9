import React from 'react';
import Header from '../../components/header/header';
import {Outlet} from 'react-router-dom';


function PropertyPage(): JSX.Element {

  return (
    <>
      <Header />

      <main className="page__main page__main--property">
        <Outlet/>
      </main>
    </>
  );
}

export default PropertyPage;
