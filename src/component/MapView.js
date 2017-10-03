import React, { Component } from "react";
import _ from "lodash";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '100%',
  height: '80%'
}


export class MapView extends Component {

  showMarkers(){
    const stations = this.props.stations;
    if (_.isEmpty(stations) ){
      return []
    }else{
      const markers = _.keys(stations).map( (key) => {
        const station = stations[key]
        return (<Marker
          key={key}
          title={station.name}
          name={station.name}
          position={{lat: station.lat, lng: station.lon}} />)

      })
      return markers;
    }
  }

render() {
    return (
      <Map google={this.props.google} style={style}
        initialCenter={{ lat: 40.7128, lng: -74.0059 }}
        zoom={14}>
        {this.showMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBcz-D3ZLF_fr3MMpGdZOng8B4sG1YDJyk")
})(MapView)
