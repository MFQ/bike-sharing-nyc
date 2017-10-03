import React, { Component } from "react";
import HistoryItem from "./HistoryItem.js";
import _ from "lodash";
import { connect } from "react-redux";
import Time from 'react-time-format';

import { Grid, Row, Col, ListGroup } from 'react-bootstrap';

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
        return (<div> Loading ..... </div>)
    }
    else{
      return (
        _.keys(this.props.stationHistory.stationHistory).map( (timeStamp) => <HistoryItem key={timeStamp} timeStamp={timeStamp} /> )
      )
    }
  }

  render(){
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={3} md={2}>
          <ListGroup>
             {this.showHistory()}
          </ListGroup>
          </Col>
          <Col xs={12} md={8}>

          </Col>
        </Row>
    </Grid>
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(HistoryView)

// <Time value={parseInt(timeStamp)} format="YYYY-MM-DD hh:mm:ss"/>
