import React from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';

import BaseLayout from "./../base/BaseLayout";
import Loading from "./../base/loading/Loading";
import AppToaster from "./../common/apptoaster/AppToaster";
import * as RoutingService from "../../services/routeboxer/routing";
import * as HistoryServices from "../../services/history/history";

import SearchBox from "./elements/SearchBox";
import { Intent } from '@blueprintjs/core';

export class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      map: null,
      directions: [],
      start: null,
      end: null,
      origin: "UTS, Sydney",
      destination: "Central Station, Sydney",
      keyword: "Food",
      places: [],
    };

    /** set up the routing service instance with the current google object */
    RoutingService.setGoogle(window.google);
  }

  render() {
    if(this.state.isLoading) {
      return(
        <BaseLayout>
          <SearchBox
              disabled={true}
              source={this.state.origin}
              sourceChangeHandler={this.sourceChangeHandler}
              destination={this.state.destination}
              destinationChangeHandler={this.destinationChangeHandler}
              keyword={this.state.keyword}
              keywordChangeHandler={this.keywordChangeHandler}
              searchHandler={this.buttonHandler}
            />
          <div className="h-screen">
            <Loading/>
          </div>
        </BaseLayout>
      )
    } else {
      return(
        <BaseLayout>
          <SearchBox
            disabled={false}
            source={this.state.origin}
            sourceChangeHandler={this.sourceChangeHandler}
            destination={this.state.destination}
            destinationChangeHandler={this.destinationChangeHandler}
            keyword={this.state.keyword}
            keywordChangeHandler={this.keywordChangeHandler}
            searchHandler={this.buttonHandler}
          />
          <Map
            style={{position: 'absolute', top: "6.125rem"}}
            google={this.props.google}
            zoom={15}
            initialCenter={{ lat: -33.867, lng: 151.195}}
            onReady={this.onReadyHandler}
          >
          {this.state.places.map((item, index) => (
            <Marker name={item.name} position={item.location} key={index}/>
          ))}
          <Polyline 
            path={this.state.directions}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} 
          />
          </Map>
        </BaseLayout>
      )
    }
  }

  performSearch = async (map) => {
    await this.setState({
      directions: [],
      start: null,
      end: null,
      places: [],
    });

    /** get DirectionsResult object that contains the direction information */
    const overview_path = await RoutingService.calculateDistanceOverview(this.state.origin, this.state.destination)
      .catch((error) => {
        AppToaster.show({
          intent: Intent.DANGER,
          message: error,
        });
        return null;
      });

    let validPath = true;
    if (!overview_path) {
      validPath = false;
    }

    /** Intercept long path due to system limitation to prevent unsupported load time */
    if (overview_path.length > 70) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Path is too long and is not currently supported by the application.",
      });
      validPath = false;
    }

    /** Fail the search to prevent searching and saving bad search metadata */
    if (!validPath) { 
      this.setState({ isLoading: false });
      return; 
    }
    
    const directions = RoutingService.extractDirection(overview_path);
    const nearbyPlaces = await RoutingService.getNearbyPlaces(this.state.keyword, overview_path, map);
    for(const value of nearbyPlaces.values()) {
      this.state.places.push({name : value.name, location: value.geometry.location});
    }

    /** Save the successful search metadata to the database */
    const routeData = {
      source: this.state.origin,
      destination: this.state.destination,
      keyword: this.state.keyword,
    }
    await HistoryServices.saveHistory(routeData);

    /** Change the render state */
    this.setState({
      directions: directions,
      start: directions[0],
      end: directions[directions.length - 1],
      isLoading: false,
    });
  }

  /** 
   * DEVONLY
   * Show the search boundary of each LatLng location on the map component
   */
   drawBoxes(boxes, map) {
    const boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
        boxpolys[i] = new window.google.maps.Rectangle({
        bounds: boxes[i],
        fillOpacity: 0,
        strokeOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight: 1,
        map: map
      });
    }
  }

  createMarker(place, map) {
      if(!place || !place.geometry) return;
      new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
      });
  }

  onReadyHandler = async (_, map) => {
    this.setState({
      map: map,
    });
  }

  sourceChangeHandler = (event) => {
    this.setState({ origin: event.target.value});
  }

  destinationChangeHandler = (event) => {
    this.setState({ destination: event.target.value});
  }

  keywordChangeHandler = (event) => {
    this.setState({ keyword: event.target.value});
  }

  buttonHandler = async () => {

    /** Validate input before searching*/
    if (!this.inputCheck()) { return; }
    this.setState({
      isLoading: true,
    });
    this.performSearch(this.state.map);
    
  }

  /**
   * Validate the user input to intercept any potential problematic input that cannot
   * be handled by the routing service
   */
  inputCheck = () => {
    const { origin, destination, keyword } = this.state;
    if (origin.length === 0) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Source cannot be empty!"
      });
      return false;
    }

    if (origin.length > 100) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Source is too long!"
      });
      return false;
    }

    if (destination.length === 0) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Destination cannot be empty!"
      });
      return false;
    }

    if (destination.length > 100) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Destination is too long!"
      });
      return false;
    }

    if (keyword.length === 0) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Keyword cannot be empty!"
      });
      return false;
    }

    if (keyword.length > 100) {
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Keyword is too long!"
      });
      return false;
    }

    return true;
  }
}

export default GoogleApiWrapper ({
  apiKey: process.env.REACT_APP_GOOGLE_JS_API_KEY
})(MapComponent);
