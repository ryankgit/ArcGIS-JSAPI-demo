require(["esri/Map", "esri/views/MapView"], function (Map, MapView) {

    // Do not require an API key when using select basemaps
    // see: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap 
    
    const map = new Map({
        basemap: "dark-gray"
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [-87.0, 41.0]
    });
});