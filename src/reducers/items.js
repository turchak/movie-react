export const itemsHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
};

export const itemsIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
};

export const popular = (state = { items: [], page: 0 }, action) => {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        items: [...state.items, ...action.popular.items],
        page: action.popular.page,
      };

    default:
      return state;
  }
};

export const item = (state = [], action) => {
  switch (action.type) {
    case 'ITEM_FETCH_DATA_SUCCESS':
      return action.item;

    default:
      return state;
  }
};

export const search = (state = [], action) => {
  switch (action.type) {
    case 'SEARCH_FETCH_DATA_SUCCESS':
      return action.search;

    default:
      return state;
  }
};
