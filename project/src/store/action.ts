import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {Comment, User} from '../types/comment';


export const cityChange = createAction<string>('root/cityChange');
export const sortingOffers = createAction<string>('root/sortingOffers');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string>('favorites/setError');
export const redirectToRoute = createAction<AppRoute | string>('app/redirectToRoute');
export const loadCurrentOffer = createAction<Offer>('data/fetchCurrentOffer');
export const loadNeighborhoodOffers = createAction<Offer[]>('data/loadNeighborhoodOffers');
export const changeDataLoaded = createAction<boolean>('data/changeDataLoaded');
export const changeReviewsLoaded = createAction<boolean>('data/changeReviewsLoaded');
export const loadOfferReviews = createAction<Comment[]>('data/loadOfferReviews');
export const setUserData = createAction<User | null>('data/setUserData');
