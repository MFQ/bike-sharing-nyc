import { arrayTohash } from "../utils/pinging.js";

export default function reducer(state={
  currentStationsState:{
    currentStationsState: {},
    fetching: false,
    fetched: false,
    refreshInterval: 20000,
    error: null
  }
}, action) {
  switch (action.type) {
    case "CHANGE_TIME_INTERVAL": {
      return { ...state, refreshInterval: action.payload };
    }
    case "FETCH_CURRENT_STATIONS_STATE": {
      return { ...state, fetching: true, fetched: false };
    }
    case "FETCH_CURRENT_STATIONS_STATE_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        currentStationsState: arrayTohash(action.payload, "station_id")
      }
    case "FETCH_CURRENT_STATIONS_STATE_REJECTED":
      return {...state, fetching: false, error: action.payload};
  }

  return state;
}
