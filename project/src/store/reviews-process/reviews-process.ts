import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewsProcess} from '../../types/state';
import dayjs from 'dayjs';


const initialState: ReviewsProcess = {
  offerReviews: [],
  isReviewsLoaded: false,
  sortedReviews: [],
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    loadOfferReviews: (state, action) => {
      state.offerReviews = action.payload;
      state.isReviewsLoaded = true;
      state.sortedReviews = state.offerReviews.sort((a, b) => dayjs(a.date).toDate().getTime() > dayjs(b.date).toDate().getTime() ? -1 : 1);
    },
    changeReviewsLoaded: (state, action) => {
      state.isReviewsLoaded = action.payload;
    },
  },
});

export const {loadOfferReviews, changeReviewsLoaded} = reviewsProcess.actions;
