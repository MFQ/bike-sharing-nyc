import React, { Component } from "react";
import Time from 'react-time-format';
import { ListGroupItem } from 'react-bootstrap';

class  HistoryItem extends Component {

  constructor(props) {
    super(props);
    this.onClickListener = this.onClickListener.bind(this);
  }

  onClickListener(e){
    this.props.setCurrentState(this.props.timeStamp);
  }

  render(){
    return(
      <ListGroupItem onClick={this.onClickListener} >
        <Time value={parseInt(this.props.timeStamp)} format="YYYY-MM-DD hh:mm:ss"/>
      </ListGroupItem>
    )
  }
}

export default HistoryItem;
