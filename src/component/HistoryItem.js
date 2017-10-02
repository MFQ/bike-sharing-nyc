import React, { Component } from "react";

class  HistoryItem extends Component {
  render(){
    return(
      <li> {this.props.timeStamp} </li>
    );
  }
}

export default HistoryItem;
