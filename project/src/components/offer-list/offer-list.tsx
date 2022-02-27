import React, {useState} from 'react';
import {Offer} from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offer[];
}

function OfferList({offers}: OfferListProps): JSX.Element {

  const [activeOfferId, setActiveOfferId] = useState<null | number>(null);
  const changeIsActive = (id: number) => {
    setActiveOfferId(id);
  };

  const removeActiveId = () => {
    setActiveOfferId(null);
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} isActive={offer.id === activeOfferId} changeIsActive={changeIsActive} removeActiveId={removeActiveId} />,
      )}
    </div>
  );
}

export default OfferList;
