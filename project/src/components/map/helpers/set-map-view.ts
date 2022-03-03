import {Map} from 'leaflet';
import {LocationOffer} from '../../../types/offer';

export const setMapView = (point: LocationOffer, map: Map) => {

  map.setView({
    lat: point.latitude,
    lng: point.longitude,
  });
};
