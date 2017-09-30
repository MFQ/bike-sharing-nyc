import { arrayTohash } from "../utils/pinging.js";

export default function reducer(state={
  stations:{},
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch (action.type) {
    case "FETCH_STATIONS": {
      return { ...state, fetching: true };
    }
    case "FETCH_STATIONS_FULLFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        stations: arrayTohash(action.payload, "station_id")
      }
    case "FETCH_STATIONS_REJECTED":
      return {...state, fetching: false, error: action.payload};
  }

  return state;
}
