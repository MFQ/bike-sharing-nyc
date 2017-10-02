import { arrayTohash } from "../utils/pinging.js"

export default function reducer(state={
  stationHistory:{},
  timeInterval: 6000 //ms
}, action) {
  switch (action.type) {
    case "ADD_STATION_HISTORY":
        const timestamp = Date.now();
        let stateHistory = state.stationHistory;
        stateHistory[timestamp] = arrayTohash(action.payload, "station_id")
        return { ...state, stationsHistory: stateHistory };
    case "UPDATE_TIME_INTERVAL":
      return {
        ...state,
        timeInterval: action.payload
      };
  }
  return state;
}
