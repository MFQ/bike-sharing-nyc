import React, { Component } from "react";
import StationList from "./StationList";

class Home extends Component {
  render(){
    return (
      <div style={{"margin-top": "-20px"}} >
        <StationList/>
      </div>
    );
  }
}

export default Home;
