import React from 'react';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-list/offer-list';
import MapComponent from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import {useAppSelector} from '../../hooks';
import {getOfferPoints} from '../../utils/common';

type MainPageProps = {
  changeIsActive(id: number | null): void;
  removeActiveId(): void;
  activeOfferId: number | null;
}

function MainPage({changeIsActive, removeActiveId, activeOfferId}: MainPageProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.filteredOffers);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        {offers ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {city}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OfferList
                  offers={offers}
                  changeIsActive={changeIsActive}
                  removeActiveId={removeActiveId}
                  classNames={'cities__places-list places__list tabs__content'}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <MapComponent mapSize={'512px'} points={getOfferPoints(offers)} activeId={activeOfferId} offers={offers}/>
                </section>
              </div>
            </div>
          </div> :
          <div className="cities">
            <div className="cities__places-container container">
              <span>Offers is Not defined</span>
            </div>
          </div>}
      </main>
    </div>
  );
}

export default MainPage;
