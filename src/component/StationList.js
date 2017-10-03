import React, {Component} from "react";
import Station from "./Station";
import MapView from "./MapView";
import _ from "lodash";

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
    }, 10000 )
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
        <MapView
          isMarkerShown
          stations={this.props.static.stations}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcz-D3ZLF_fr3MMpGdZOng8B4sG1YDJyk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
    )
  }
}

// { this.showStations() }

export default connect(mapStationStateToProps, mapDispatchToProps)(StationList)
