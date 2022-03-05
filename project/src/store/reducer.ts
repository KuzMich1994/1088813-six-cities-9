import {createReducer} from '@reduxjs/toolkit';
import {cityChange, sortingOffers} from './action';
import {offers} from '../fixture/offers';
import {SortType} from '../const';

const initialState = {
  city: 'Paris',
  offers: offers,
  filteredOffers: offers.filter((offer) => offer.city.name === 'Paris'),
  sortType: 'Popular',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
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
