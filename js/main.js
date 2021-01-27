require(["esri/Map", "esri/views/MapView"], function (
    Map, 
    MapView
    ) {

    const map = new Map({
        basemap: "arcgis-topographic"
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [-87.0, 41.0]
    });
});