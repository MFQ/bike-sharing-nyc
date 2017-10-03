import React, { Component } from "react";

class  HistoryItem extends Component {
  render(){
    return(
      <li> {this.props.timestamp} </li>
    );
  }
}

export default HistoryItem;
