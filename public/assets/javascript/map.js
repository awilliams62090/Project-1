 // function initialize() {
        //     var mapOptions = {
        //         center: new google.maps.LatLng(40, -105),
        //         zoom: 10
        //     };

        //     var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
        // }
        // var marker;

        // function initMap() {
        //     var map = new google.maps.Map(document.getElementById('mapDiv'), {
        //         zoom: 13,
        //         center: {
        //             lat: 39.7392,
        //             lng: -104.9903
        //         }
        //     });

        //     marker = new google.maps.Marker({
        //         map: map,
        //         draggable: true,
        //         animation: google.maps.Animation.DROP,
        //         position: {
        //             lat: 59.327,
        //             lng: 18.067
        //         }
        //     });

        //     function toggleBounce() {
        //         if (marker.getAnimation() !== null) {
        //             marker.setAnimation(null);
        //         } else {
        //             marker.setAnimation(google.maps.Animation.BOUNCE);
        //         }
        //     };
        //     marker.addListener('click', toggleBounce);
        // }

        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position.coords)
          })

          // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('mapDiv'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
        google.maps.event.addDomListener(window, "load", initMap);