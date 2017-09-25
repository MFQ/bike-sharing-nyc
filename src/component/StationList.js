import React, {Component} from "react";
import Station from "./Station";
import axios from "axios";
import _ from "lodash";

class StationList extends Component {

  state = { stations:{}, currentStations: {} }

  getCurrentstatus(stations){
    return axios.get(" https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then( (response) => {
      let currentStationStates = {};
      _.each(response.data.data.stations, (s) => (currentStationStates[s.station_id] = s) );
      return Promise.resolve( { currentState: currentStationStates} );
    });
  }

  componentDidMount(){
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then( (response) => {
      let stationStore = {};
      _.each(response.data.data.stations, (s) => (stationStore[s.station_id] = s) );
      this.getCurrentstatus().then( (result) => {
        this.setState( {stations:stationStore, currentStations: result.currentState } );
      });
      this.liveUpdates();
    });
  }

  liveUpdates(){
    setInterval( () => {
      this.getCurrentstatus().then( (result) => {
        this.setState( {currentStations: result.currentState} );
      });
    }, 60000 );
  }

  showStations(){
    if (_.isEmpty( this.state.stations )){
      return "Stations are loading ....."
    }else{
      return _.keys(this.state.stations).map( (stationKey) => <Station colorStatus={this.colorStatus(stationKey)}  key={stationKey} {...this.state.stations[stationKey]} /> );
    }
  }

  colorStatus(stationKey){
    const availableBikes = this.state.currentStations[stationKey].num_bikes_available;
    const totalBikes = this.state.stations[stationKey].capacity;

    if (totalBikes == 0)
      return "Red";

    const percentage = ( (availableBikes/totalBikes) * 100)
    if (percentage == 0)
      return "Red";
    else if (percentage < 50) {
      return "Orange"
    }else if(percentage < 75) {
      return "Blue"
    }else {
      return "Green"
    }
  }


  render(){
    return(
      <div>
        <h1> Bikes List </h1>
        { this.showStations() }
      </div>
    )
  }
}

export default StationList;
