import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';


export const cityChange = createAction<string>('root/cityChange');
export const sortingOffers = createAction<string>('root/sortingOffers');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string>('favorites/setError');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const setUserEmail = createAction<string | null>('user/setUserEmail');
export const setAvatarUrl = createAction<string | null>('user/setAvatarUrl');
