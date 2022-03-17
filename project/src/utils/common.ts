import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const getRating = (rating: number): number => (Math.round(rating) / 5) * 100;
export const getOffersByCity = (cityName: string, offers: Offer[]) =>
  offers.filter((offer) => offer.city.name === cityName);

export const getOfferPoints = (offers: Offer[]) =>
  offers.map(({id, location: {latitude, longitude, zoom}}) => ({
    id,
    latitude,
    longitude,
    zoom,
  }));

export const getCityPoint = (offers: Offer[], cityName: string) =>
  offers.find((offer) => offer.city.name === cityName);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;
export const isAuthorize = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Authorize;
