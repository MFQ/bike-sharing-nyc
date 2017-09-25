import React, {Component} from "react";
import Station from "./Station";
import axios from "axios";

class StationList extends Component {

  state = { stations:[] }

  componentDidMount(){
    axios.get("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then( (response) => {
      this.setState( { stations: response.data.data.stations } );
    });
  }

  render(){
    return(
      <div>
        <h1> Bikes List </h1>
        { this.state.stations.map( (station) => <Station key={station.station_id} {...station} />) }
      </div>
    )
  }
}

export default StationList;
