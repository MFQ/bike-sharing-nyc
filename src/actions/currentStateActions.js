import axios from "axios";

export function fetchStaticStations() {
  return function(dispatch){
    dispatch( {type: "FETCH_CURRENT_STATIONS_STATE"} );
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")
      .then( (response) => dispatch({ type: "FETCH_CURRENT_STATIONS_STATE_FULLFILLED", payload: response.data.data.stations}) )
      .catch( (err) => dispatch({ type: "FETCH_CURRENT_STATIONS_STATE_REJECTED", payload: err }) );
  }

}
