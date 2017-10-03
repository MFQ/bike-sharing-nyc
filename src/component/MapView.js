import React, { Component } from "react";
import _ from "lodash";

import {Map, InfoWindow, Marker, GoogleApiWrapper, google } from 'google-maps-react';

const style = {
  width: '100%',
  height: '80%'
}

export class MapView extends Component {

  getCurrentStatus(key){
    if(_.isEmpty(this.props.stationsStatus)){
      return "bicycle-store.svg"
    }else{
      if(this.props.stationsStatus === undefined)
        return "bicycle-store.svg";
      const stationStatus = this.props.stationsStatus[key];
      const availableBikes = stationStatus.num_bikes_available;
      const totalBikes = this.props.stations[key].capacity;
      if (totalBikes === 0)
        return "red-bicycle-store.svg";
      const percentage = ( (availableBikes/totalBikes) * 100)
      if (percentage === 0)
        return "red-bicycle-store.svg";
      else if (percentage < 50) {
        return "orange-bicycle-store.svg"
      }else if(percentage < 75) {
        return "blue-bicycle-store.svg"
      }else {
        return "green-bicycle-store.svg"
      }
    }
  }

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
          position={{lat: station.lat, lng: station.lon}}
          icon={{
            url: "/" + this.getCurrentStatus(key),
            anchor: new this.props.google.maps.Point(16,16),
            scaledSize: new this.props.google.maps.Size(32,32)
          }}
        />)
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
