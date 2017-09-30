import { combineReducers } from "redux";

import station from "./stationsReducer";
import history from "./historyReducer";
import current from "./currentReducer";

export default combineReducers({
  station,
  history,
  current
});
