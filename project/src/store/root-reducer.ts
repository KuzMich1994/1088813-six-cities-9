import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import {dataProcess} from './data-process/data-process';
import {reviewsProcess} from './reviews-process/reviews-process';


export const rootReducer = combineReducers({
  [NameSpace.user]: userProcess.reducer,
  [NameSpace.data]: dataProcess.reducer,
  [NameSpace.reviews]: reviewsProcess.reducer,
});
