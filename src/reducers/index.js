import { combineReducers } from 'redux';
import {
  popular,
  item,
  itemsHasErrored,
  itemsIsLoading,
  search,
} from './items';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  routing: routerReducer,
  popular,
  item,
  search,
  itemsHasErrored,
  itemsIsLoading,
});
