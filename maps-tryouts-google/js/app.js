var map = null;
geocoder = new google.maps.Geocoder();

var styles = [
    {
    "featureType": "administrative.locality", //administrative.province
    "stylers": [
            { "visibility": "on" },
            { "color": "#0000ff" }
        ]
  }
];


function initialize() {
    navigator.geolocation.getCurrentPosition(function(position){
        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        
        map.setOptions({styles: styles});
        google.maps.event.addListener(map, 'click', function(event) {
            console.log('click', event);
            placeMarker(map, event.latLng);
        });
        
        
        
        var flightPlanCoordinates = [
            new google.maps.LatLng(37.772323, -122.214897),
            new google.maps.LatLng(21.291982, -157.821856),
            new google.maps.LatLng(-18.142599, 178.431),
            new google.maps.LatLng(-27.46758, 153.027892)
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        
        flightPath.setMap(map);

    });    
}


function placeMarker(map, latLng){
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
var searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', function(evt){
    var address = document.getElementById('location').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
});

