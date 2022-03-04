import {createAction} from '@reduxjs/toolkit';


export const cityChange = createAction<string>('root/cityChange');
export const filterOffers = createAction('root/filterOffers');
