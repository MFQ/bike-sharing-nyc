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
          stations={this.props.static.stations}
          stationsStatus={this.props.current.currentStationsState}
        />
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(StationList)
