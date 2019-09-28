import React from 'react';
import { Button, Intent } from "@blueprintjs/core";
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';

import BaseLayout from "./../base/BaseLayout";
import Loading from "./../base/loading/Loading";
import * as RoutingService from "../../services/routeboxer/routing";
import * as HistoryServices from "../../services/history/history";

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
      destination: "Central station, Sydney",
      keyword: "food",
      places: [],
    };
    RoutingService.setGoogle(window.google);
  }

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

  performSearch = async (map) => {
    await this.setState({
      directions: [],
      start: null,
      end: null,
      places: [],
    });
    const overview_path = await RoutingService.calculateDistanceOverview(this.state.origin, this.state.destination);
    const directions = RoutingService.extractDirection(overview_path);
    const nearbyPlaces = await RoutingService.getNearbyPlaces(this.state.keyword, overview_path, map);
    console.log(nearbyPlaces);
    for(const value of nearbyPlaces.values()) {
      this.state.places.push({name : value.name, location: value.geometry.location});
    }
    console.log(this.state.places);
    this.setState({
      directions: directions,
      start: directions[0],
      end: directions[directions.length - 1],
      isLoading: false,
    });
  }

  buttonHandler = async () => {
    this.setState({
      isLoading: true,
      keyword: "bar",
    });
    this.performSearch(this.state.map);
    const history_check = await HistoryServices.getAllHistory();
    console.log(history_check);
    
  }

  render() {
    if(this.state.isLoading) {
      return(
        <BaseLayout>
          <div className="h-screen">
            <Loading/>
          </div>
        </BaseLayout>
      )
    } else {
      return(
        <BaseLayout>
          <Button className="h-10 z-10" intent={Intent.WARNING} onClick={this.buttonHandler}>Test Search</Button>
          <Map
            style={{position: 'absolute', top: '5.5rem'}}
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
}

export default GoogleApiWrapper ({
  apiKey: "AIzaSyAlmVIf4j_kl6NLPeZgn-uY-tDxNrXlcwo"
})(MapComponent);
