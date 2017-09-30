import axios from "axios";

export function fetchStaticStations() {
  return function(dispatch){
    dispatch( {type: "FETCH_STATIONS"} );
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
      .then( (response) => dispatch({ type: "FETCH_STATIONS_FULLFILLED", payload: response.data.data.stations}) )
      .catch( (err) => dispatch({ type: "FETCH_STATIONS_REJECTED", payload: err }) );
  }
}
