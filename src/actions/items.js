import { API } from '../utils/api';
export const itemsHasErrored = bool => {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool,
  };
};

export const itemsIsLoading = bool => {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool,
  };
};

export const itemsFetchDataSuccess = items => {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
  };
};

export const itemFetchDataSuccess = item => {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
};

export const itemsFetchData = url => {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    API.get(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(items => dispatch(itemsFetchDataSuccess(items.results)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
};

export const itemFetchData = url => {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    API.get(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(item => dispatch(itemFetchDataSuccess(item)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
};
