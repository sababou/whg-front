const DEFAULT_STATE = {
  games: [],
};

const GamesReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case "SET_GAMES":
      return {
        ...state,
        games: action.payload,
      };

    default:
      return state;
  }
};

export default GamesReducer;
