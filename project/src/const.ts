export enum AppRoute {
  Login = '/login',
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Authorize = 'authorize',
  NotAuthorize = 'not-authorize',
  Unknown = 'unknown',
}

export const CITIES_LIST = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const SORT_TYPES = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const BASE_URL = 'https://9.react.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Hotels = '/hotels',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}
