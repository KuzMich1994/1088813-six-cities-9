import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {Offer} from '../types/offer';
import {APIRoute} from '../const';
import {loadOffers} from './action';


export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    const {data} = await api.get<Offer[]>(APIRoute.Hotels);
    store.dispatch(loadOffers(data));
  },
);
