import RouteBoxer from "./routeboxer";

var google = null;
var routeBoxer = null;
var directionsService = null;

export function setGoogle(googleInstance) {
  google = googleInstance;
  routeBoxer = new RouteBoxer(googleInstance);
  directionsService = new google.maps.DirectionsService();
}

export function getGoogle() {
  return google;
}

export function getRouteBoxer() {
  return routeBoxer;
}

export function calculateDistanceOverview(origin, destination) {
  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result.routes[0].overview_path);
        } else {
          reject(`error fetching directions ${result}`);
        }
      }
    );
  });
}

export function extractDirection(overview_path) {
  return overview_path.map(p => {return {lat:p.lat() , lng:p.lng()}});
}

export async function getNearbyPlaces(keyword, overview_path, map){
  const placeServices = new window.google.maps.places.PlacesService(map);
  const boxes = await routeBoxer.box(overview_path, 0.07);
  return await searchBound(boxes, keyword, placeServices);
}

async function searchBound(bound, keyword, placeServices) {
  const placesMap = new Map();
  for (var i = 0; i < bound.length; i++) {
    await performSearch(bound[i], keyword, placeServices)
      .catch((error) => {console.log(error)})
      .then((value) => {
        if(!value) return;
        for (let j = 0; j < value.length; j++) {
          if(!placesMap.get(value[j].id)) {
            placesMap.set(value[j].id, value[j]);
          }
        }
      });
  };
  return placesMap;
}

function calculateBoundCenter(bound) {
  console.log(bound.getCenter().toJSON());
}

function performSearch(bound, keyword, placeServices) {
  calculateBoundCenter(bound);
  let request = {
    location: bound.getCenter(),
    radius: "10",
    keyword: keyword,
    openNow: true
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      placeServices.nearbySearch(request, (result, status) => {
        if(status !== google.maps.places.PlacesServiceStatus.OK) reject(status);
        resolve(result);
      });
    }, 10)
  });
}