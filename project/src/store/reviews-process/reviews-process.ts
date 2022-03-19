import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewsProcess} from '../../types/state';


const initialState: ReviewsProcess = {
  offerReviews: [],
  isReviewsLoaded: false,
};

export const reviewsProcess = createSlice({
  name: NameSpace.reviews,
  initialState,
  reducers: {
    loadOfferReviews: (state, action) => {
      state.offerReviews = action.payload;
      state.isReviewsLoaded = true;
    },
    changeReviewsLoaded: (state, action) => {
      state.isReviewsLoaded = action.payload;
    },
  },
});

export const {loadOfferReviews, changeReviewsLoaded} = reviewsProcess.actions;
