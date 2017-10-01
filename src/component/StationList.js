import React, {Component} from "react";
import Station from "./Station";
import _ from "lodash";
import getCurrentStatus from "../utils/pinging.js";

import { connect } from "react-redux";
import { fetchStaticStations } from "../actions/stationsActions";
import { fetchCurrentStations } from "../actions/currentStateActions";

const mapStationStateToProps = (store) => ({
  static: {
    stations: store.station.stations,
    fetching: store.station.fetching,
    fetched: store.station.fetched
  },
  current: {
    currentStationsState: store.current.currentStationsState,
    fetching: store.current.fetching,
    fetched: store.current.fetched,
    refreshInterval: store.current.refreshInterval
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchStaticStations: () =>  dispatch(fetchStaticStations() ),
  fetchCurrentStations: () => dispatch(fetchCurrentStations() )
});

class StationList extends Component {
  liveUpdates(){
    const component = this
    setInterval( () => {
      component.props.fetchCurrentStations();
    }, this.props.current.currentStationsState.refreshInterval )
  }

  componentDidMount(){
    this.props.fetchStaticStations();
    this.props.fetchCurrentStations();
    this.liveUpdates();
  }

  showStations(){
    if ( this.props.static.fetching ){
      return "Stations are loading .....";
    }else{
      return _.keys(this.props.static.stations).map( (stationKey) => <Station colorStatus={ this.colorStatus(stationKey) } key={stationKey} {...this.props.static.stations[stationKey]} /> );
    }
  }

  colorStatus(stationKey){
    if (this.props.current.currentStationsState === undefined || this.props.current.currentStationsState[stationKey] === undefined )
      return;

    const availableBikes = this.props.current.currentStationsState[stationKey].num_bikes_available;
    const totalBikes = this.props.static.stations[stationKey].capacity;

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
        { this.showStations() }
      </div>
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(StationList)
