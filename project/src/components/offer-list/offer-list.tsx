import React from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
  changeIsActive(id: number | null): void;
  removeActiveId(): void;
}

function OfferList({offers, changeIsActive, removeActiveId}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} changeIsActive={changeIsActive} removeActiveId={removeActiveId} />,
      )}
    </div>
  );
}

export default OfferList;
