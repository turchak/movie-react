import { combineReducers } from 'redux';
import {
  popular,
  item,
  genres,
  itemsHasErrored,
  itemsIsLoading,
  search,
} from './items';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  routing: routerReducer,
  popular,
  item,
  genres,
  search,
  itemsHasErrored,
  itemsIsLoading,
});
