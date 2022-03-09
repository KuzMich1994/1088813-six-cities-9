import {createReducer} from '@reduxjs/toolkit';
import {cityChange, loadOffers, sortingOffers} from './action';
import {SortType} from '../const';
import {Offer} from '../types/offer';

type InitialState = {
  city: string;
  offers: Offer[];
  filteredOffers: Offer[];
  sortType: string;
  isDataLoaded: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  filteredOffers: [],
  sortType: 'Popular',
  isDataLoaded: false,
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
    })
    .addCase(sortingOffers, (state, sortType) => {
      switch (sortType.payload) {
        case SortType.LowToHigh: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.price > b.price ? 1 : -1);
          break;
        }
        case SortType.HighToLow: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.price < b.price ? 1 : -1);
          break;
        }
        case SortType.TopRated: {
          state.filteredOffers = state.filteredOffers.sort((a, b) => a.rating < b.rating ? 1 : -1);
          break;
        }
        case SortType.Popular: {
          state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
          break;
        }
      }
      state.sortType = sortType.payload;
    });
});
