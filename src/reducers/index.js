import { combineReducers } from "redux";

import station from "./stationsReducer";
import stationHistory from "./historyReducer";
import current from "./currentReducer";

export default combineReducers({
  station,
  stationHistory,
  current
});
