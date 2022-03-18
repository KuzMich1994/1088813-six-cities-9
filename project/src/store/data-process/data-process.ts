import {DataProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, SortType} from '../../const';


const initialState: DataProcess = {
  offers: [],
  isDataLoaded: false,
  currentOffer: null,
  neighborhoodOffers: null,
  filteredOffers: [],
  city: 'Paris',
  sortType: 'Popular',
  selectedSortItem: 0,
};

export const dataProcess = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === 'Paris');
      state.isDataLoaded = true;
    },
    cityChange: (state, action) => {
      state.city = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
      state.sortType = 'Popular';
      state.selectedSortItem = 0;
    },
    sortingOffers: (state, action) => {
      switch (action.payload) {
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
      state.sortType = action.payload;
    },
    changeDataLoaded: (state, action) => {
      state.isDataLoaded = action.payload;
    },
    loadNeighborhoodOffers: (state, action) => {
      state.neighborhoodOffers = action.payload;
    },
    loadCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const {loadOffers, loadNeighborhoodOffers, changeDataLoaded, cityChange, sortingOffers, loadCurrentOffer} = dataProcess.actions;