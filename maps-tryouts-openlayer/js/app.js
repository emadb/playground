var map = new OpenLayers.Map('map', {projection: new OpenLayers.Projection("EPSG:3857"),
                sphericalMercator: true }) ; 
var mapnik = new OpenLayers.Layer.OSM("Simple map");
map.addLayer(mapnik);
map.setCenter(new OpenLayers.LonLat(10, 45), 5);

console.log('completed');

/*
var dm_wms = new OpenLayers.Layer.WMS( "Canadian Data", "http://www2.dmsolutions.ca/cgi-bin/mswms_gmap",
    {
        layers: "bathymetry,land_fn,park,drain_fn,drainage," +
                "prov_bound,fedlimit,rail,road,popplace",
        transparent: "true",
        format: "image/png"
    },
    {isBaseLayer: false}
);
map.addLayer(dm_wms);
*/

// var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
// var feature = new OpenLayers.Feature.Vector(
//     new OpenLayers.Geometry.Point(-71, 42),
//     {some:'data'},
//     {externalGraphic: 'img/marker.png', graphicHeight: 21, graphicWidth: 16});
// vectorLayer.addFeatures(feature);
// map.addLayer(vectorLayer);

var myStyles = new OpenLayers.StyleMap({ 
     "default": new OpenLayers.Style({ 
                fillColor: "${getColor}",                         
                strokeColor: "#00FF01", 
                fillOpacity: 0.5, 
                graphicZIndex: 1 

            },
            {
                context: {
                    getColor : function (feature) {
                        var color = "#ff8800";
                        if (Math.floor((Math.random()*2)+1) == 1){
                            color = "#00ff88";
                        }
                        return color;
                    }
                }})
 });

var geojsonLayer = new OpenLayers.Layer.Vector("GeoJSON", {styleMap: myStyles});
map.addLayer(geojsonLayer);
geojsonLayer.setVisibility(true)

$.get('comuni.json', function(data){
        $.each(data.features, function(index, item){
            if (item.properties.COD_PRO == 17) {
                

                var geojson_format = new OpenLayers.Format.GeoJSON();
                geojsonLayer.addFeatures(geojson_format.read(item));
            }
        })
        
        console.log('design complete');
    });