import React, { Component } from "react";
import HistoryItem from "./HistoryItem.js";
import _ from "lodash";
import { connect } from "react-redux";

import { Grid, Row, Col, ListGroup } from 'react-bootstrap';
import MapView from "./MapView";

import { fetchHistory, getStateByTimeStamp } from "../actions/historyAction";
import { fetchStaticStations } from "../actions/stationsActions";

const mapStationStateToProps = (store) => ({
  stationHistory: {
    stationHistory: store.stationHistory.stationHistory,
    timeInterval: store.stationHistory.timeInterval,
    currentState: store.stationHistory.currentState
  },
  static: {
    stations: store.station.stations,
    fetching: store.station.fetching,
    fetched: store.station.fetched
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchHistory: () =>  dispatch(fetchHistory()),
  fetchStaticStations: () =>  dispatch(fetchStaticStations() ),
  getStateByTimeStamp: (timeStamp) => dispatch( getStateByTimeStamp(timeStamp) )
});

class HistoryView extends Component {

  constructor(props) {
    super(props);
    this.setCurrentState = this.setCurrentState.bind(this);
  }

  componentDidMount(){
    this.props.fetchStaticStations();
    this.props.fetchHistory();
    setInterval( () => {
      this.props.fetchHistory();
    },this.props.stationHistory.timeInterval )
  }

  setCurrentState(timeStamp){
    this.props.getStateByTimeStamp(timeStamp);
  }

  showHistory(){
    if(_.isEmpty(this.props.stationHistory.stationHistory)){
        return (<div> Loading ..... </div>)
    }
    else{
      return (
        _.keys(this.props.stationHistory.stationHistory).map( (timeStamp) => <HistoryItem setCurrentState={this.setCurrentState} key={timeStamp} timeStamp={timeStamp} /> )
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
          <Col xs={12} md={8} style={ {height: "800px"} } >
            <MapView
              isMarkerShown
              stations={this.props.static.stations}
              stationsStatus={ this.props.stationHistory.currentState }
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcz-D3ZLF_fr3MMpGdZOng8B4sG1YDJyk&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Col>
        </Row>
    </Grid>
    )
  }
}

export default connect(mapStationStateToProps, mapDispatchToProps)(HistoryView)
