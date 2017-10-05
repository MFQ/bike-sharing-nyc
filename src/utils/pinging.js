import axios from "axios";
import _ from "lodash";


const getCurrentStatus = () => {
  return axios.get(" https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then( (response) => {
    let currentStationStates = {};
    _.each(response.data.data.stations, (s) => (currentStationStates[s.station_id] = s) );
    return Promise.resolve( { currentState: currentStationStates} );
  });
}

export function arrayTohash(array, key){
  return _.reduce( array, (hash, element) => {
    hash[element[key]] = element;
    return hash;
  }, {});
}


export default getCurrentStatus;
