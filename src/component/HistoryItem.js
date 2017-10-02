import React, { Component } from "react";
import Time from 'react-time-format'

class  HistoryItem extends Component {
  render(){

    return(
      <li>
        <Time value={parseInt(this.props.timeStamp)} format="YYYY-MM-DD hh:mm:ss"/>
      </li>
    );
  }
}

export default HistoryItem;
