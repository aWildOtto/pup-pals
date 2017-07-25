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
    zoom={props.zoom}
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
        icon={{
          url: 'http://i.imgur.com/pRdsr4R.png',
          scaledSize : new google.maps.Size(65, 75)
        }}
        /> 
      })}
  </GoogleMap>
));

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      bounds: null,
      center: {
        lat: 49.2827291,
        lng: -123.12073750000002,
      },
      markers: [],
    };
    
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
    const bound_a = {
      lat: this.state.bounds.f.b,
      lng: this.state.bounds.b.b
    }
    const bound_b = {
      lat: this.state.bounds.f.f,
      lng: this.state.bounds.b.f
    } 
    this.props.locationFilter(bound_a, bound_b);
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

    this.setState({
      zoom: 15,
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
          zoom={this.state.zoom}
        />
        <SideBar          
          ref="sidebar"
          events={this.props.events}
          user={this.props.user}
          fetchAppData={this.props.fetchAppData}
          dates={this.props.dates}
        />
      </div>
    );
  }
}

export default Map;