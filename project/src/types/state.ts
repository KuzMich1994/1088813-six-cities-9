import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {User} from './comment';
import {Offer} from './offer';
import {Comment} from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
};

export type DataProcess = {
  offers: Offer[];
  isDataLoaded: boolean;
  currentOffer: Offer | null;
  neighborhoodOffers: Offer[] | null;
  filteredOffers: Offer[];
  city: string;
  sortType: string;
  selectedSortItem: number;
  isFavoritesChanged: boolean;
  favoritesOffers: Offer[];
};

export type ReviewsProcess = {
  offerReviews: Comment[],
  isReviewsLoaded: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
