$(function(){
    var map = L.map('map', {
        dragging: true,
        center: [45.33, 10.0],
        zoom: 8
    });

    var startingPoint = [45.33, 10.0];

    // DISEGNI
    map.on('click', function(evt){
        var latlngs = [startingPoint];
        latlngs.push(evt.latlng);
        L.polyline(latlngs, {color: 'red'}).addTo(map);    
        startingPoint = evt.latlng;
    });
    
    //http://{s}.tile.osm.org/{z}/{x}/{y}.png
    //http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    //http://tile2.opencyclemap.org/transport/{z}/{x}/{y}.png
    //http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        styleId: 22677,
        attribution: 'yo',
        maxZoom: 18
        
    }).addTo(map);


    // var marker = L.marker([45, 10.0])
    // marker.addTo(map);
    // marker.dragging.enable();
    // marker.on('dragend', function(something){
    //     console.log('dragend', marker);

    L.marker([45.33, 10.0]).addTo(map);

    // });

    // POLIGONI
   // L.polygon([[45.33, 10.0], [46.33, 10.0], [46.33, 11.0]], {color: '#00FF00'}).addTo(map);

    // GEO JSON
    console.log('loading data...');
    $.get('comuni.json', function(data){

        $.each(data.features, function(index, item){
            if (item.properties.COD_PRO == 17) {
                var color = "#ff0000";
                if (Math.floor((Math.random()*2)+1) == 1){
                    color = "#00ff00";
                }


                L.geoJson(item, { style: function(feature){
                    console.log(feature);
                    return {color: color};
                } }).addTo(map);            
            }
        })
        
        //var brescia = _.where(data.features, {"properties.COD_PRO": 17});
        //console.log(brescia);
        //L.geoJson(data, { style: function(feature){
        //    console.log(feature);
        //    return {color: "#ff0000"};
        //} }).addTo(map);    

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

