import {LocationOffer} from './offer';

export type MapPoints = {
  latitude: number;
  longitude: number;
  zoom?: number;
  id: number;
}

export type MapCityPoint = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  name: string;
}
