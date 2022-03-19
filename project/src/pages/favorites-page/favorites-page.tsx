import React from 'react';
import Header from '../../components/header/header';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import FavoriteOfferCard from '../../components/favorite-offer-card/favorite-offer-card';
import {useAppSelector} from '../../hooks';
import FavoritesScreenEmpty from '../../components/favorites-screen-empty/favorites-screen-empty';


function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(({DATA}) => DATA.offers);
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);
  const citiesCollection = new Set<string>();

  favoritesOffers.forEach((offer) => {
    citiesCollection.add(offer.city.name);
  });

  const uniqueCities = Array.from(citiesCollection);

  if (favoritesOffers.length === 0) {
    return <FavoritesScreenEmpty/>;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCities.map((city) =>
                (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoritesOffers.map((offer) =>
                        offer.city.name === city ?
                          <FavoriteOfferCard
                            key={offer.id}
                            offer={offer}
                          /> :
                          '',
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
