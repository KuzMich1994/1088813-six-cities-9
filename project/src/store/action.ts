import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';


export const cityChange = createAction<string>('root/cityChange');
export const sortingOffers = createAction<string>('root/sortingOffers');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
