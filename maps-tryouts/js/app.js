$(function(){

    var map = L.map('map', {
        center: [45.33, 10.0],
        zoom: 5
    });

    var startingPoint = [45.33, 10.0];

    map.on('click', function(evt){
        var latlngs = [startingPoint];
        latlngs.push(evt.latlng);
        L.polyline(latlngs, {color: 'red'}).addTo(map);    
        startingPoint = evt.latlng;
    });
    
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        styleId: 22677,
        attribution: 'yo',
        maxZoom: 18
        
    }).addTo(map);

    L.marker([45.33, 10.0]).addTo(map);

    L.polygon([[45.33, 10.0], [46.33, 10.0], [46.33, 11.0]], {color: '#00FF00'}).addTo(map);


    console.log('loading data...');
    $.get('brescia.json', function(data){
        console.log("lombardia loaded...")
        L.geoJson(data, { style: function(feature){
            console.log(feature);
            return {color: "#ff0000"};
        } }).addTo(map);    
        console.log('design complete');
    });

    // $.get('elenco-comuni.json', function(data){
    //     $.each(data, function(index, item){
    //         var lat = item.lat;
    //         var lon = item.lon;
    //         if ((lat !== '#N/A') && (lon !== '#N/A') && (index < 100)){
    //             console.log('Adding', item.DENOM_LOC, item.lat, item.lon);
    //             L.marker([lat, lon],{title: item.DENOM_LOC}).addTo(map);
    //         }
    //     });
    // });
    


/*
var map = L.map('map').setView([45.33, 10.0], 5);

var brescia = L.marker([45.33, 10.0]).bindPopup('Bresa');
var cities = L.layerGroup([brescia]);

L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'yo',
    maxZoom: 18
    
}).addTo(map);
*/

})

