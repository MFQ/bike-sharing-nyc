import React, { Component } from "react";
import Time from 'react-time-format';
import { ListGroupItem } from 'react-bootstrap';

class  HistoryItem extends Component {
  render(){
    return(
      <ListGroupItem>
        <Time value={parseInt(this.props.timeStamp)} format="YYYY-MM-DD hh:mm:ss"/>
      </ListGroupItem>
    )
  }
}

export default HistoryItem;
