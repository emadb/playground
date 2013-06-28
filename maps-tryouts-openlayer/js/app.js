var map = L.map('map', {
    center: [45.33, 10.0],
    zoom: 10
});

var startingPoint = [45.33, 10.0];

map.on('click', function(evt){
    var latlngs = [startingPoint];
    latlngs.push(evt.latlng);
    L.polyline(latlngs, {color: 'red'}).addTo(map);    
    startingPoint = evt.latlng;
});

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'yo',
    maxZoom: 18
    
}).addTo(map);

L.marker([45.33, 10.0]).addTo(map);

L.polygon([[45.33, 10.0], [46.33, 10.0], [46.33, 11.0]], {color: '#00FF00'}).addTo(map);
/*
var map = L.map('map').setView([45.33, 10.0], 5);

var brescia = L.marker([45.33, 10.0]).bindPopup('Bresa');
var cities = L.layerGroup([brescia]);

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'yo',
    maxZoom: 18
    
}).addTo(map);
*/


