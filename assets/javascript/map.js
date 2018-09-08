 // function initialize() {
        //     var mapOptions = {
        //         center: new google.maps.LatLng(40, -105),
        //         zoom: 10
        //     };

        //     var map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
        // }
        var marker;

        function initMap() {
            var map = new google.maps.Map(document.getElementById('mapDiv'), {
                zoom: 13,
                center: {
                    lat: 39.7392,
                    lng: -104.9903
                }
            });

            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: {
                    lat: 59.327,
                    lng: 18.067
                }
            });

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            };
            marker.addListener('click', toggleBounce);
        }

        google.maps.event.addDomListener(window, "load", initMap);