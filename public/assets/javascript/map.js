//     Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
// var map;
// var markers = [];
// var infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById('mapDiv'), {
//     center: {lat: 39.7392, lng: -104.9903},
//     zoom: 16
//   });
// 

// Try HTML5 geolocation.
// 
// }

// 
var infoWindow;
var map;
var markers = [];

function initMap() {
  var denver = {
    lat: 39.7392,
    lng: -104.9903
  };

  map = new google.maps.Map(document.getElementById('mapDiv'), {
    zoom: 12,
    center: denver,
    mapTypeId: 'terrain'
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function (event) {
    addMarker(event.latLng);
  });

  // Adds a marker at the center of the map.
  addMarker(denver);

  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Pet\'s Home');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  };

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
};

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
};

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
};

google.maps.event.addDomListener(window, "load", initMap);