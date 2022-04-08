import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {dataProcess} from './data-process/data-process';
import {reviewsProcess} from './reviews-process/reviews-process';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
});
