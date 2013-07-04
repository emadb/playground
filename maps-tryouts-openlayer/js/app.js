 var map = new OpenLayers.Map('map');
        
var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS","http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
map.addLayer(wms);
map.zoomToMaxExtent();

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

var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(-71, 42),
    {some:'data'},
    {externalGraphic: 'img/marker.png', graphicHeight: 21, graphicWidth: 16});
vectorLayer.addFeatures(feature);
map.addLayer(vectorLayer);