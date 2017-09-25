import React, {Component} from "react";
import Station from "./Station";
import axios from "axios";
import _ from "lodash";

class StationList extends Component {

  state = { stations:{} }

  componentDidMount(){
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then( (response) => {
      // debugger;
      let stationStore = {};
      _.each(response.data.data.stations, (s) => {
        stationStore[s.station_id] = s
      });
      this.setState( {stations:stationStore}  );
      this.liveUpdates();
    });
  }

  liveUpdates(){
    setInterval( () => {
      axios.get(" https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then( (response) => {
        console.log(response);
      });
    }, 30000 );
  }

  showStations(){
    if (_.isEmpty( this.state.stations )){
      return "Stations are loading ....."
    }else{
      return _.keys(this.state.stations).map( (stationKey) => <Station key={stationKey} {...this.state.stations[stationKey]} /> );
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
