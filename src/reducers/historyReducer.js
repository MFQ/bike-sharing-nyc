import { arrayTohash } from "../utils/pinging.js"

export default function reducer(state={
  stationHistory:{},
  timeInterval: 60000,
  currentState: {}
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
    case "GET_STATE":
      return {
        ...state,
        currentState: state.stationHistory[action.payload]
      }

    default:
  }
  return state;
}
