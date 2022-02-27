import React, {useEffect, useRef} from 'react';
import {Offer, OfferCity} from '../../types/offer';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  currentOfferCity: OfferCity;
  currentCityOffers: Offer[];
  activeId: number | null;
}

function Map({currentOfferCity, currentCityOffers, activeId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentOfferCity);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      currentCityOffers.forEach((currentOffer) => {
        leaflet
          .marker({
            lat: currentOffer.location.latitude,
            lng: currentOffer.location.longitude,
          }, {
            icon: (currentOffer.id === activeId ?
              currentCustomIcon : defaultCustomIcon
            ),
          }).addTo(map);
      });
    }
  }, [map, currentCityOffers]);

  return (
    <div ref={mapRef} style={{maxWidth: '512px', overflow: 'hidden', height: '100%'}}>

    </div>
  );
}

export default Map;
