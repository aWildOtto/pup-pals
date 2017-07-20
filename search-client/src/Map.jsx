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

const SearchBoxGoogleMap = withGoogleMap(props => (
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
    { props.events.map((e) => {
      return <Marker 
      key={e.id}
      position={{ lat: parseFloat(e.latitude), lng: parseFloat(e.longitude) }} 
      onClick={props.onMarkerClick}
      /> })}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center: {
        lat: 49.2828082,
        lng: -123.10668750000002,
      },
      markers: []
    };
  }
  
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
    const events = this.props.events
    events.map((event) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const threshold = 0.000001;
      const event_lat = parseFloat(event.latitude);
      const event_lng = parseFloat(event.longitude);
      if (Math.abs(lat - event_lat) < threshold && Math.abs(lng - event_lng) < threshold) {
        this.refs.sidebar.toggleHidden(event);       
      }
    })
    // console.log('lat: ' + lat + '\nlng: ' + lng)
  }
  
  render() {
    return (
      <div className="mapcontainer">
        <SearchBoxGoogleMap
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
          events={this.props.events}
          onMarkerClick={this.handleMarkerClick}
        />
        <SideBar          
          events={this.props.events}
          user={this.props.user}
          fetchAppData={this.props.fetchAppData}
          ref="sidebar"
        />
      </div>
    );
  }
}

export default Map;