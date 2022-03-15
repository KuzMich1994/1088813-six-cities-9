import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {Offer} from '../types/offer';
import {Comment} from '../types/comment';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  setAvatarUrl,
  setError,
  setUserEmail,
  loadCurrentOffer,
  loadNeighborhoodOffers, loadOfferReviews, setUserData
} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';

export const clearErrorAction = createAsyncThunk(
  'favorites/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Hotels);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNeighborhoodOffers = createAsyncThunk(
  'data/fetchNeighborhoodOffers',
  async (id: string) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Hotels}/${id}${APIRoute.Nearby}`);
      store.dispatch(loadNeighborhoodOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOffer = createAsyncThunk(
  'data/fetchCurrentOffer',
  async (id: string) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Hotels}/${id}`);
      store.dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(redirectToRoute(`${AppRoute.Offer}/${id}/${AppRoute.Undefined}`));
    }
  },
);

export const getOfferReviews = createAsyncThunk(
  'data/getOfferReviews',
  async (id: string) => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadOfferReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const pushNewComment = createAsyncThunk(
  'data/pushNewComment',
  async (comment: Comment) => {
    try {
      console.log(comment)
      await api.post<Comment>(APIRoute.Comments, {comment});
    } catch (error) {
      errorHandle(error);
    }
  }
)

export const getUserEmail = createAsyncThunk(
  'user/getUserEmail',
  async () => {
    const {data: {email, avatarUrl}} = await api.get(APIRoute.Login);
    const {data} = await api.get(APIRoute.Login);
    store.dispatch(setUserEmail(email));
    store.dispatch(setAvatarUrl(avatarUrl));
    store.dispatch(setUserData(data));
    console.log(data)
  },
);

export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Authorize));
      store.dispatch(getUserEmail());
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Authorize));
      store.dispatch(getUserEmail());
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    } catch (error) {
      errorHandle(error);
    }
  },
);
