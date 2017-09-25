import React, {Component} from "react";
import Station from "./Station";

class StationList extends Component {

  getStations(){
    return [
      {
        id:1,
        totalBikes: 10,
        currentAvaiableBikes: 5
      },
      {
        id:2,
        totalBikes: 20,
        currentAvaiableBikes: 15
      }
      ,{
        id:3,
        totalBikes: 15,
        currentAvaiableBikes: 8
      }
      ,{
        id:4,
        totalBikes: 11,
        currentAvaiableBikes: 3
      },
      {
        id:5,
        totalBikes: 19,
        currentAvaiableBikes: 15
      }
    ]
  }

  render(){
    return(
      <div>
        <h1> Bikes List </h1>
        { this.getStations().map( (station) => <Station key={station.id} {...station} />) }
      </div>
    )
  }
}

export default StationList;
