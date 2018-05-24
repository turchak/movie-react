import { combineReducers } from 'redux';
import { items, item, itemsHasErrored, itemsIsLoading, search } from './items';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  routing: routerReducer,
  items,
  item,
  search,
  itemsHasErrored,
  itemsIsLoading,
});
