import React, { Component } from "react";
import _ from "lodash";

import { compose, withProps, lifecycle } from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 40.7128, lng: -74.0059
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          this.setState({center: nextCenter, markers: nextMarkers, });
        },
        getCurrentStatus: (key, props) => {
          if(_.isEmpty(props.stationsStatus)){
            return "bicycle-store.svg"
          }else{
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
        },

        showMarkers: (props) => {

          const stations = props.stations;
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
                  url: "/" + props.getCurrentStatus(key, props),
                  anchor: new window.google.maps.Point(16,16),
                  scaledSize: new window.google.maps.Size(32,32)
                }}
              />)
            })
            return markers;
          }
        }

      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} controlPosition={2} onPlacesChanged={props.onPlacesChanged} >
      <input
        type="text"
        placeholder="Search"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
     {props.showMarkers(props)}
  </GoogleMap>
);

<MapWithASearchBox />


export default MapWithASearchBox
