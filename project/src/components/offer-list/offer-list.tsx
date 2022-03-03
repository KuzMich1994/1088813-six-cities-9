import React from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
  changeIsActive(id: number | null): void;
  removeActiveId(): void;
  classNames: string;
}

function OfferList({offers, changeIsActive, removeActiveId, classNames}: OfferListProps): JSX.Element {
  return (
    <div className={classNames}>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} changeIsActive={changeIsActive} removeActiveId={removeActiveId} />,
      )}
    </div>
  );
}

export default OfferList;
