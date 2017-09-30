import { arrayTohash } from "../utils/pinging.js";

export default function reducer(state={
  currentStationsState:{
    currentStationsState: {},
    fetching: false,
    fetched: false,
    error: null
  }
}, action) {

  switch (action.type) {
    case "FETCH_CURRENT_STATIONS_STATE": {
      return { ...state, fetching: true };
    }
    case "FETCH_CURRENT_STATIONS_STATE_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        stations: arrayTohash(action.payload, "id")
      }
    case "FETCH_CURRENT_STATIONS_STATE_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "GET_STATION_BY_ID":
      return state.stations[action.payload];
  }

  return state;
}
