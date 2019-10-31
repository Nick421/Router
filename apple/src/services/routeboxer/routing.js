import RouteBoxer from "./routeboxer";

var google = null;
var routeBoxer = null;
var directionsService = null;

/**
 * Save google object, initiate a routeBoxer instance and a directionsService 
 * using google object
 *
 * @param {googleInstance} a google object
 * @return {LatLng[]} array of only LatLng extracted from overview_path
 */

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

/**
 * Search for path directing the user between the two starting and destination locations
 * with driving as the travel mode
 *
 * @param {origin} a LatLng object for the starting position
 * @param {destination} a LatLng object for the destination position
 * @return {DirectionsResult} The DirectionsResult object that contains the direction information for the path
 */

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
          reject("Cannot find a path to destination.");
        }
      }
    );
  });
}

/**
 * Extract LatLng array from a DirectionsResult object
 *
 * @param {overview_path} a DirectionsResult object for a path direction
 * @return {LatLng[]} array of only LatLng extracted from overview_path
 */

export function extractDirection(overview_path) {
  return overview_path.map(p => {return {lat:p.lat() , lng:p.lng()}});
}

/**
 * Search for nearby location that is related to the keyword surround each location
 * on each each of the LatLng object in the overview_path array
 *
 * @param {keyword} keyword to search for location
 * @param {overview_path} array of LatLng to search for surrounding locations
 * @param {map} the google map object that contains the metadata for the current map information
 * @return {Map<string, PlaceResult>} map of PlaceResult and the PlaceResult object
 */

export async function getNearbyPlaces(keyword, overview_path, map){
  const placeServices = new window.google.maps.places.PlacesService(map);
  const boxes = await routeBoxer.box(overview_path, 0.07);
  return await searchBound(boxes, keyword, placeServices);
}

/**
 * Do a nearbySearch on each of the indicated LatLngBound and map the result to remove any
 * search duplication
 *
 * @param {bound} a LatLngBounds object array that contains the bound for the location search result
 * @param {keyword} keyword to search for location
 * @return {Map<string, PlaceResult>} array of only LatLng extracted from overview_path
 */

async function searchBound(bound, keyword, placeServices) {
  const placesMap = new Map();
  for (var i = 0; i < bound.length; i++) {
    await performSearch(bound[i], keyword, placeServices)
      .catch((error) => {})
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

/**
 * A wrapper for the nearbySearch API function to ensure search request provide correct parameter and
 * do not overload the API call limit
 *
 * @param {bound} a single LatLngBounds object that contains the bound for a location search result
 * @param {keyword} keyword to search for location
 * @return {PlaceResult[]} array of PlaceResult objects containing the information of places found by the search
 */

function performSearch(bound, keyword, placeServices) {
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