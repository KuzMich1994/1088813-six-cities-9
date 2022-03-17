import {createReducer} from '@reduxjs/toolkit';
import {
  changeDataLoaded, changeReviewsLoaded,
  cityChange, loadCurrentOffer, loadNeighborhoodOffers, loadOfferReviews,
  loadOffers,
  requireAuthorization,
  setError, setUserData,
  sortingOffers
} from './action';
import {AuthorizationStatus, SortType} from '../const';
import {Offer} from '../types/offer';
import {Comment, User} from '../types/comment';

type InitialState = {
  city: string;
  offers: Offer[];
  filteredOffers: Offer[];
  sortType: string;
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  selectedSortItem: number;
  error: string;
  userEmail: string | null;
  avatarURL: string | null,
  currentOffer: Offer | null;
  neighborhoodOffers: Offer[] | null;
  offerReviews: Comment[];
  userData: User | null;
  isReviewsLoaded: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  filteredOffers: [],
  sortType: 'Popular',
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  selectedSortItem: 0,
  error: '',
  userEmail: null,
  avatarURL: null,
  currentOffer: null,
  neighborhoodOffers: null,
  offerReviews: [],
  userData: null,
  isReviewsLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === 'Paris');
      state.isDataLoaded = true;
    })
    .addCase(cityChange, (state, currentCity) => {
      state.city = currentCity.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortType = 'Popular';
      state.selectedSortItem = 0;
    })
    .addCase(sortingOffers, (state, sortType) => {
      switch (sortType.payload) {
        case SortType.LowToHigh: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.price > b.price ? 1 : -1);
          state.selectedSortItem = 1;
          break;
        }
        case SortType.HighToLow: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.price < b.price ? 1 : -1);
          state.selectedSortItem = 2;
          break;
        }
        case SortType.TopRated: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.rating < b.rating ? 1 : -1);
          state.selectedSortItem = 3;
          break;
        }
        case SortType.Popular: {
          state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
          state.selectedSortItem = 0;
          break;
        }
      }
      state.sortType = sortType.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(changeDataLoaded, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(changeReviewsLoaded, (state, action) => {
      state.isReviewsLoaded = action.payload;
    })
    .addCase(loadNeighborhoodOffers, (state, action) => {
      state.neighborhoodOffers = action.payload;
    })
    .addCase(loadOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
      state.isReviewsLoaded = true;
    });
});
