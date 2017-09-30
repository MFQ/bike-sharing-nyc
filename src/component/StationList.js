import React, {Component} from "react";
import Station from "./Station";
import axios from "axios";
import _ from "lodash";
import getCurrentStatus from "../utils/pinging.js";

import { connect } from "react-redux";
import { fetchStaticStations } from "../actions/stationsActions";

const mapStationStateToProps = state => {
  return { stations: state.stations }
}

class StationList extends Component {

  // state = { stations:{}, currentStations: {} }

  componentDidMount(){

    // this.props.dispatch(fetchStaticStations());
    debugger

    // axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then( (response) => {
    //   let stationStore = {};
    //   _.each(response.data.data.stations, (s) => (stationStore[s.station_id] = s) );
    //   getCurrentStatus().then( (result) => {
    //     this.setState( {stations:stationStore, currentStations: result.currentState } );
    //   });
    //   this.liveUpdates();
    // });
  }

  liveUpdates(){
    setInterval( () => {
      getCurrentStatus().then( (result) =>  this.setState( {currentStations: result.currentState} ) );
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

    if (totalBikes === 0)
      return "Red";

    const percentage = ( (availableBikes/totalBikes) * 100)
    if (percentage === 0)
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
      </div>
    )
  }
}

export default StationList;
