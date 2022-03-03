import React, {MutableRefObject, useEffect, useState} from 'react';
import leaflet, {Map, TileLayer} from 'leaflet';
import {LocationOffer} from '../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: LocationOffer,
) {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef?.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: city.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [map, mapRef, city]);

  return map;
}

export default useMap;
