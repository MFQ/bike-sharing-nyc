import { arrayTohash } from "../utils/pinging.js"

export default function reducer(state={
  stationHistory:{},
  timeInterval: 60000 //ms
}, action) {
  switch (action.type) {
    case "ADD_STATION_HISTORY":
        const timestamp = Date.now();
        let stateHistory = this.state.historicalData;
        stateHistory[timestamp] = arrayTohash(action.payload, "id")
        return { ...state, stationsHistory: stateHistory };
    case "UPDATE_TIME_INTERVAL":
      return {
        ...state,
        timeInterval: action.payload
      };
  }
  return state;
}
