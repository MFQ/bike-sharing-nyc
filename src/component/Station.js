import React, { Component } from "react";

class Station extends Component{

  render(){
    return(
      <div>
        Total Bike = {this.props.capacity}
        Color status = { this.props.colorStatus }
      </div>
    );
  }
}

export default Station;
