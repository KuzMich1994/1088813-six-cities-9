import {AuthorizationStatus, NameSpace} from '../../const';
import {UserProcess} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {requireAuthorization, setUserData} = userProcess.actions;
