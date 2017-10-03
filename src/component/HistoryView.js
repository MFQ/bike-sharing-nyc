import React, { Component } from "react";
import getCurrentStatus from "../utils/pinging.js";
import HistoryItem from "./HistoryItem.js";
import _ from "lodash";

class HistoryView extends Component {

  state = { historicalData: {} }

  componentDidMount(){
    getCurrentStatus().then( (status) => this.updateHistory(status) );
    setInterval( () => {
      getCurrentStatus().then( (status) => this.updateHistory(status) )
    }, 30000 );
  }

  updateHistory(status){
    const timestamp = Date.now();
    let stateHistory = this.state.historicalData;
    stateHistory[timestamp] = status
    this.setState({historicalData: stateHistory});
  }

  showHistory(){
    return (
      <div>
        <ul>
          { _.keys(this.historicalData).map( (historyTimeStamp) => <HistoryItem key={historyTimeStamp} timeStamp={historyTimeStamp} /> ) }
        </ul>
      </div>
    )
  }

  render(){
    return(
      <div>
        { this.showHistory() }
      </div>
    )
  }
}

export default HistoryView;
