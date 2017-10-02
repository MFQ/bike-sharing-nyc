import React, { Component } from "react";
import HistoryItem from "./HistoryItem.js";
import _ from "lodash";
import { connect } from "react-redux";

import { fetchHistory } from "../actions/historyAction";

const mapStationStateToProps = (store) => ({
  stationHistory: {
    stationHistory: store.stationHistory.stationHistory,
    timeInterval: store.stationHistory.timeInterval
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchHistory: () =>  dispatch(fetchHistory() )
});

class HistoryView extends Component {

  componentDidMount(){
    this.props.fetchHistory();
    setInterval( () => {
      this.props.fetchHistory();
    },this.props.stationHistory.timeInterval )
  }

  showHistory(){

    if(_.isEmpty(this.props.stationHistory.stationHistory)){
        return (<div> Loading ..... </div>);
    }
    else{
      return (
        <div>
          <ul>
            { _.keys(this.props.stationHistory.stationHistory).map( (timeStamp) => <HistoryItem key={timeStamp} timeStamp={timeStamp} /> ) }
          </ul>
        </div>
      )
    }
  }

  render(){
    return(
      <div>
        { this.showHistory() }
      </div>
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(HistoryView)
