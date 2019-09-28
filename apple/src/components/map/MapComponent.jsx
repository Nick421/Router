import React, {createRef} from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker } from 'google-maps-react';
import BaseLayout from "./../base/BaseLayout";
import RouteBoxer from "../../services/routeboxer/routeboxer";

export class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      bounds: null,
      start: {},
      end: {},
      boxes: {},
      location: [],
      locationSize: 0,
      map: null,
    };
    this.directionsService = new window.google.maps.DirectionsService();
    this.routeBoxer = new RouteBoxer(this.props.google);
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
      var marker = new window.google.maps.Marker({
      map: map,
      position: place.geometry.location
      });
  }

  calculateDistance = (mapProps, map) => {
    console.log(map);
    console.log("Run");
    const origin = "UTS, Sydney";
    const destination = "Central station, Sydney";
    this.setState({map: map});
    const placeServices = new window.google.maps.places.PlacesService(map);
    this.directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: this.props.google.maps.TravelMode.DRIVING
      },
      async (result, status) => {
        if (status === this.props.google.maps.DirectionsStatus.OK) {
          await this.setState({location: []});
          const calculatedDirection = result.routes[0].overview_path.map(p => {return {lat:p.lat() , lng:p.lng()}});
          var boxes = await this.routeBoxer.box(result.routes[0].overview_path, 0.07)
          console.log(boxes);
          // this.drawBoxes(boxes, map);
          // for(var i = 0; i < boxes.length; i++) {
          //   console.log(boxes[i]);
          // }
          await this.searchBound(boxes, placeServices);
          // console.log(result.routes[0].overview_path);
          this.setState({
            directions: calculatedDirection,
            start: calculatedDirection[0],
            end: calculatedDirection[calculatedDirection.length-1],
            boxes: boxes,
          });
        } else {
          console.log("What?");
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  searchBound = async (bound, placeServices) => {
    for (var i = 0; i < bound.length - 1; i++) {
      setTimeout(() => {
        this.performSearch(bound[i], placeServices)
      }, 500 * i);;
    }
  }

  performSearch = async (bound, placeServices) => {
    var request = {
      bounds: bound,
      keyword: 'food',
    };
    await placeServices.nearbySearch(request, this.callback);
 }
 callback = (results, status) => {
  if (status != window.google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  var oneRound = []
  for(var i = 0; i < results.length; i++) {
    // console.log(results[i]);
    if(results[i]) this.createMarker(results[i], this.state.map);
    // this.state.location.push(results[i]);
  }
  // this.state.location.push(oneRound);
  // this.setState({locationSize: this.state.locationSize + results.length});
  }

  render = () => {

    return(
      <BaseLayout>
        <Map
          google={this.props.google}
          zoom={15}
          initialCenter={{ lat: -33.867, lng: 151.195}}
          onReady={this.calculateDistance}
          bounds = {this.bounds}
        >
        
        <Polyline 
          path={this.state.directions}
          strokeColor="#0000FF"
          strokeOpacity={0.8}
          strokeWeight={2} />
        <Marker position={this.state.start}/>
        <Marker position={this.state.end}/>
        {this.renderMarker()}
        </Map>
      </BaseLayout>
    )
  }

  renderMarker = () => {
    // console.log(this.state.location)
    // for (var i = 0; i < this.state.location.length; i++) {
    //     console.log(this.state.location[i])
    // }
  }
}

export default GoogleApiWrapper ({
  apiKey: "AIzaSyAlmVIf4j_kl6NLPeZgn-uY-tDxNrXlcwo"
})(MapComponent);
