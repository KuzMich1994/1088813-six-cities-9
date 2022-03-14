import request from 'axios';
import {ErrorType} from '../types/error';
import {store} from '../store';
import {setError} from '../store/action';
import {clearErrorAction} from '../store/async-actions';
import {HTTP_CODE} from '../const';


export const errorHandle = (error: ErrorType): void => {

  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST: {
        handleError(response.data.error);
        break;
      }
      case HTTP_CODE.NOT_FOUND: {
        handleError(response.data.error);
        break;
      }
      case HTTP_CODE.UNAUTHORIZED: {
        handleError(response.data.error);
        break;
      }
    }
  }

};
