function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // Clear any previous route boxes from the map
    clearBoxes();
    // Convert the distance to box around the route from miles to km
    //distance = parseFloat(document.getElementById("distance").value);
    distance = 0.02
    directionsService.route(
        {
          origin: {query: document.getElementById('start').value},
          destination: {query: document.getElementById('end').value},
          travelMode: 'DRIVING'
        },
        function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            // Box around the overview path of the first route
            var path = response.routes[0].overview_path;
            var boxes = routeBoxer.box(path, distance);
            drawBoxes(boxes);
            searchBounds(boxes);
            /*for (var i = 0; i < allPlaces.length; i++){
                console.log("Marking pkace number " + i);
                if (boxes.contains(new google.maps.LatLng(allPlaces[i].geometry.location.lat(), allPlaces[i].geometry.location.lng()))){
                    createMarker(allPlaces[i].geometry.location);
                }
            }*/
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
}
// Draw the array of boxes as polylines on the map
function drawBoxes(boxes) {
  boxpolys = new Array(boxes.length);
  for (var i = 0; i < boxes.length; i++) {
    boxpolys[i] = new google.maps.Rectangle({
      bounds: boxes[i],
      fillOpacity: 0,
      strokeOpacity: 1.0,
      strokeColor: '#000000',
      strokeWeight: 1,
      map: map
    });
  }
}

// Clear boxes currently on the map
function clearBoxes() {
  if (boxpolys != null) {
    for (var i = 0; i < boxpolys.length; i++) {
      boxpolys[i].setMap(null);
    }
  }
  boxpolys = null;
}

function searchBounds(bound) {
   for (var i = 0; i < bound.length; i++) {
     (function(i) {
       setTimeout(function() {

         // Perform search on the bound and save the result
         performSearch(bound[i]);

         //If the last box
         if ((bound.length - 1) === i) {
           //addAllMarkers(bound);
         }
       }, 400 * i);
     }(i));
   }
}

function performSearch(bound) {
   /*var request = {
        query: 'food',
        fields: ['name'],
     locationBias: bound
   };*/
   console.log("Performing search");
   var request = {
     bounds: bound,
     keyword: 'bar'
   };
   currentBound = bound;
   service.nearbySearch(request, callback);
   //var service = new google.maps.places.PlacesService(map);
   //service.findPlaceFromQuery(request, callback);

}

function callback(results, status) {
   if (status != google.maps.places.PlacesServiceStatus.OK) {
     console.error(status);
     return;
   }

   /*for (var i = 0, result; result = results[i]; i++) {
     // Go through each result from the search and if the place exist already in our list of places then don't push it in to the array

     if (!placeExists(result.id)) {
       allPlaces.push(result);
       console.log("result being push to array");
     }
   }*/
   console.log("Creating marker now.....");
   for (var i = 0; i < results.length; i++) {
           console.log(results[i]);
        createMarker(results[i]);
      }
}

function createMarker(place) {
    var infowindow = new google.maps.InfoWindow({content: ""});
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
}

function placeExists(resultID){
    for (var i = 0; i < allPlaces.length; i++){
        if (allPlaces[i].id = resultID){
            return true;
        }
    }
    return false;
}