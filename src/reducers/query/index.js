const DEFAULT_STATE = {
  country: null,
  brand_id: null,
  category: null,
  page: 0,
};

const QueryReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_QUERY_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };

    case "SET_QUERY_BRAND_ID":
      return {
        ...state,
        brand_id: action.payload,
      };

    case "SET_QUERY_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SET_QUERY_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};

export default QueryReducer;
