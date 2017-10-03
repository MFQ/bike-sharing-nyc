import React, { Component } from "react";
import getCurrentStatus from "../utils/pinging.js";
import _ from "lodash";

class CurrentView extends Component {

  state = { currentStations: {} }

  componentDidMount(){
    getCurrentStatus().then( (result) => this.setState( {currentStations: result.currentState } ) );
    setInterval( () => {
      getCurrentStatus().then( (result) => this.setState( {currentStations: result.currentState } ) );
    }, 30000);
  }

  displayCurrentStats(){

    if (_.isEmpty( this.state.currentStations )){
      return (
        <tr>
          <td> loading.... </td>
        </tr>
      )
    }
    else{
      const currentStore = this.state.currentStations;
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


export default CurrentView;
