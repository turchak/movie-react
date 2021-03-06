import { API } from '../utils/api';
import { normalize, schema } from 'normalizr';
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
    popular: {
      items: items.results,
      page: items.page,
    },
  };
};

export const itemFetchDataSuccess = item => {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
};

export const resultsFetchDataSuccess = search => {
  return {
    type: 'SEARCH_FETCH_DATA_SUCCESS',
    search,
  };
};

export const genresFetchDataSuccess = genres => {
  return {
    type: 'GENRES_FETCH_DATA_SUCCESS',
    genres,
  };
};

export const itemsFetchData = (url, param) => {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    API.get(url, param)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(items => dispatch(itemsFetchDataSuccess(items)))
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

export const searchFetchData = (url, param) => {
  return dispatch => {
    dispatch(itemsIsLoading(true));
    API.get(url, param)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(itemsIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(search => dispatch(resultsFetchDataSuccess(search.results)))
      .catch(() => dispatch(itemsHasErrored(true)));
  };
};

export const genresFetchData = url => {
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
      .then(results => {
        const genresData = results;
        const genres = new schema.Entity('genres');
        const genresSchema = { genres: [genres] };
        const normalizedData = normalize(genresData, genresSchema);
        dispatch(genresFetchDataSuccess(normalizedData));
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
};
