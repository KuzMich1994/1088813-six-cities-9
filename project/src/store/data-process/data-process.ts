import {DataProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_CITY, NameSpace, SortType} from '../../const';


const initialState: DataProcess = {
  offers: [],
  isDataLoaded: false,
  currentOffer: null,
  neighborhoodOffers: null,
  filteredOffers: [],
  city: DEFAULT_CITY,
  sortType: SortType.Popular,
  selectedSortItem: 0,
  isFavoritesChanged: false,
  favoritesOffers: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city);
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
    isFavoritesChangedState: (state, action) => {
      state.isFavoritesChanged = action.payload;
    },
    loadFavoritesOffers: (state, action) => {
      state.favoritesOffers = action.payload;
    },
  },
});

export const {loadOffers, loadNeighborhoodOffers, changeDataLoaded, cityChange, sortingOffers, loadCurrentOffer, isFavoritesChangedState, loadFavoritesOffers} = dataProcess.actions;
