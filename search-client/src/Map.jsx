import React, { Component } from 'react';
import SideBar from './SideBar.jsx'

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps/lib";

import SearchBox from "react-google-maps/lib/places/SearchBox";

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `455px`,
  height: `46px`,
  marginTop: `50px`,
  padding: `10px 16px`,
  borderRadius: `6px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `18px`,
  outline: `none`,
  textOverflow: `ellipsis`,
  overflow: `hidden`,
  whiteSpace: `nowrap`,
  opacity: `0.8`,
};

const SearchBoxExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Location"
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker 
        position={marker.position} 
        key={index} 
        onClick={props.onMarkerClick}
      />
    ))}
    <Marker 
      position={{ lat: 49.279948, lng: -123.13869410000001 }} 
      onClick={props.onMarkerClick}
    />
    <Marker 
      position={{ lat: 49.2884964, lng: -123.01807739999998 }} 
      onClick={props.onMarkerClick}
    />
  </GoogleMap>
));

class Map extends Component {

  state = {
    bounds: null,
    center: {
      lat: 49.2828082,
      lng: -123.10668750000002,
    },
    markers: [],
    events: [{
      id: 31,
      creator_user_id: 3,
      title: 'Doggos Beach Party',
      description: 'Bring your pups to the beach! All pups welcome.',
      location: 'Sunset Beach Park',
      lat: 49.279948,
      lng: -123.13869410000001,
      open_status: true,
      restriction: false,
      date_time: '2017-08-02 12:00:00-07'
    }, 
    {
      id: 32,
      creator_user_id: 4,
      title: 'Small pups playdate',
      description: 'Playdate at the dog park',
      location: 'Burnaby Heights Off-leash Park',
      lat: 49.279948,
      lng: -123.13869410000001,
      open_status: true,
      restriction: false,
      date_time: '2017-06-05 19:48:31'
    }]
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    
    markers.forEach((marker) => {
      const lat = marker.position.lat();
      const lng = marker.position.lng();
      console.log('lat: ' + lat + '\nlng: ' + lng)
    })

    this.setState({
      center: mapCenter,
    });
  }
  
  handleMarkerClick(e) {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log('lat: ' + lat + '\nlng: ' + lng)
  }

  render() {
    return (
      <div className="mapcontainer">
        <SearchBoxExampleGoogleMap
          containerElement={
            <div style={{ height: '100%'}} />
          }
          mapElement={
            <div style={{ height: '100%'}} />
          }
          center={this.state.center}
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
        />
        <SideBar          
          events={this.state.events}
        />
      </div>
    );
  }
}

export default Map;