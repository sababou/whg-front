import GamesReducer from "./games";
import WaitingReducer from "./waiting";
import QueryReducer from "./query";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  games: GamesReducer,
  waiting: WaitingReducer,
  query: QueryReducer,
});

export default allReducers;
