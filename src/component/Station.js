import React, { Component } from "react";

class Station extends Component{

  colorStatus(){
    const percentage = (( this.props.currentAvaiableBikes / this.props.totalBikes ) * 100)
    if (percentage == 0)
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
      <div>
        Total Bike = {this.props.totalBikes}
        <br/>
        Current Avaiable Bikes = {this.props.currentAvaiableBikes}
        <br/>
        Color status = { this.colorStatus() }
      </div>
    );
  }
}


export default Station;
