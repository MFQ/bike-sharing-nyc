import React, { Component } from "react";

import _ from "lodash";
import { connect } from "react-redux";
import { fetchCurrentStations } from "../actions/currentStateActions";

const mapStationStateToProps = (store) => ({
  current: {
    currentStationsState: store.current.currentStationsState,
    fetching: store.current.fetching,
    fetched: store.current.fetched,
    refreshInterval: store.current.refreshInterval
  }
});

const mapDispatchToProps = (dispatch) => ({ fetchCurrentStations: () => dispatch(fetchCurrentStations() ) });

class CurrentView extends Component {

  liveUpdates(){
    const component = this
    setInterval( () => {
      component.props.fetchCurrentStations();
    }, this.props.current.currentStationsState.refreshInterval )
  }

  componentDidMount(){
    this.props.fetchCurrentStations();
    this.liveUpdates();
  }

  displayCurrentStats(){
    if ( ! (this.props.current.fetched) ){
      return (
        <tr>
          <td> loading.... </td>
        </tr>
      )
    }
    else{
      const currentStore = this.props.current.currentStationsState;
      return (_.keys(currentStore).map( (stationKey) => {
        return (
          <tr key={stationKey} >
            <td> {currentStore[stationKey].station_id} </td>
            <td> {currentStore[stationKey].num_bikes_available} </td>
          </tr>
        )
      }))
    }
  }

  render(){
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Station Id </th>
              <th> Number bikes available </th>
            </tr>
          </thead>
          <tbody>
            {this.displayCurrentStats()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(CurrentView)
