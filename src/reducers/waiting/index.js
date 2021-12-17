const DEFAULT_STATE = {
  spinning: false,
};

const WaitingReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_SPINNING":
      return {
        ...state,
        spinning: action.payload,
      };

    default:
      return state;
  }
};

export default WaitingReducer;
