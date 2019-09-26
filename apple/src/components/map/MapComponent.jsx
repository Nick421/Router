import React from 'react';
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
    };
    this.directionsService = new window.google.maps.DirectionsService();
    this.routeBoxer = new RouteBoxer(this.props.google);
  }
  
  calculateDistance = () => {
    console.log("Run");
    const origin = "UTS, Sydney";
    const destination = "Central station, Sydney";
    this.directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: this.props.google.maps.TravelMode.DRIVING
      },
      async (result, status) => {
        if (status === this.props.google.maps.DirectionsStatus.OK) {
          const calculatedDirection = result.routes[0].overview_path.map(p => {return {lat:p.lat() , lng:p.lng()}});
          var bound = new this.props.google.maps.LatLngBounds();
          
          for (var i = 0; i < this.state.directions.length; i++) {
            bound.extend(this.state.directions[i]);
          }
          var boxes = await this.routeBoxer.box(result.routes[0].overview_path, 0.02)

          this.setState({
            directions: calculatedDirection,
            start: calculatedDirection[0],
            end: calculatedDirection[calculatedDirection.length-1],
            bounds: bound,
            boxes: boxes,
          });
        } else {
          console.log("What?");
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  render = () => {
    console.log(this.props.google);
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
        </Map>
      </BaseLayout>
    )
  }
}

export default GoogleApiWrapper ({
  apiKey: "AIzaSyAlmVIf4j_kl6NLPeZgn-uY-tDxNrXlcwo"
})(MapComponent);
