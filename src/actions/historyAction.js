import axios from "axios";

export function fetchHistory() {
  return function(dispatch){
    dispatch( {type: "FETCH_CURRENT_STATIONS_STATE"} );
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")
      .then( (response) => dispatch({ type: "ADD_STATION_HISTORY", payload: response.data.data.stations}) )
      .catch( (err) => dispatch({ type: "FETCH_CURRENT_STATIONS_STATE_REJECTED", payload: err }) );
  }
}


export function getStateByTimeStamp( timeStamp ){
  return {
      type: "GET_STATE",
      payload: timeStamp
  }
}
