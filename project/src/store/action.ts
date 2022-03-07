import {createAction} from '@reduxjs/toolkit';


export const cityChange = createAction<string>('root/cityChange');
export const sortingOffers = createAction<string>('root/sortingOffers');
