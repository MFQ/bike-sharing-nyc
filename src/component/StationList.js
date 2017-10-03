import React, {Component} from "react";
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
    fetched: store.current.fetched
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

  render(){
    return(
        <MapView
          isMarkerShown
          stations={this.props.static.stations}
          stationsStatus={this.props.current.currentStationsState}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcz-D3ZLF_fr3MMpGdZOng8B4sG1YDJyk&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(StationList)
