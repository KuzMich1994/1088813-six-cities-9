import {createReducer} from '@reduxjs/toolkit';
import {cityChange, filterOffers} from './action';
import {offers} from '../fixture/offers';

const initialState = {
  city: 'Paris',
  offers: offers,
  filteredOffers: offers.filter((offer) => offer.city.name === 'Paris'),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, currentCity) => {
      state.city = currentCity.payload;
    })
    .addCase(filterOffers, (state) => {
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
    });
});
