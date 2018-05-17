import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';

export const rootReducer = combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
});
