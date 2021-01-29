require([
    "esri/Map", 
    "esri/layers/FeatureLayer", 
    "esri/views/MapView", 
    "esri/PopupTemplate",
    "esri/widgets/Legend"
], function (Map, FeatureLayer, MapView, PopupTemplate, Legend) {

    // Does not require an API key when using select basemaps
    // see: https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap 
    
    // create map
    const map = new Map({
        basemap: "gray-vector"
    });

    // set FeatureLayer visual variables
    const colorVisVar = {
        "type": "color",
        "field": "CrimeCnt",
        "valueExpression": null,
        "stops": [{
            "value": 0,
            "color": [
              255,
              252,
              212,
              255
            ],
            "label": "< 0"
          },
          {
            "value": 25,
            "color": [
              224,
              178,
              193,
              255
            ],
            "label": null
          },
          {
            "value": 50.8,
            "color": [
              193,
              104,
              173,
              255
            ],
            "label": "50.8"
          },
          {
            "value": 75.9,
            "color": [
              123,
              53,
              120,
              255
            ],
            "label": null
          },
          {
            "value": 101,
            "color": [
              53,
              2,
              66,
              255
            ],
            "label": "> 101"
          }
        ]
      };
    
      const sizeVisVar = {
        "type": "size",
        "field": "NarcoticsC",
        "valueExpression": null,
        "valueUnit": "unknown",
        "minSize": {
          "type": "size",
          "valueExpression": "$view.scale",
          "stops": [{
              "value": 1128,
              "size": 12
            },
            {
              "value": 2256,
              "size": 12
            },
            {
              "value": 288896,
              "size": 3
            },
            {
              "value": 2311162,
              "size": 3
            },
            {
              "value": 97989703,
              "size": 1.5
            }
          ]
        },
        "maxSize": {
          "type": "size",
          "valueExpression": "$view.scale",
          "stops": [{
              "value": 1128,
              "size": 60
            },
            {
              "value": 2256,
              "size": 60
            },
            {
              "value": 288896,
              "size": 37.5
            },
            {
              "value": 2311162,
              "size": 37.5
            },
            {
              "value": 97989703,
              "size": 18.75
            }
          ]
        },
        "minDataValue": 0,
        "maxDataValue": 378
      };

    // create simple render, set visual variables
    const renderer = {
        type: "simple",     // autocasts as new SimpleRenderer
        symbol: {
            type: "simple-marker",      // autocasts as new SimpleMarkerSymbol
            outline: {      // autocasts as new SimpleLineSymbol
                color: [128, 128, 128],
                width: 0.5
            }
        },
        label: "test",
        // set color and
        visualVariables: [colorVisVar, sizeVisVar]
    };

    // create PopupTemplate
    const popupTemplate = new PopupTemplate({
        title: "Crime in Tract {NAME}",
        content: [{
            // Specify the type of popup element - fields
            //fieldInfos autocasts
            type: "fields",
            fieldInfos: [{
                fieldName: "CrimeCnt",
                visible: true,
                label: "Number of crimes: "
              },
              {
                fieldName: "NarcoticsC",
                visible: true,
                label: "Number of narcotics crimes: "
              },
            ]
          },
          {
            type: "media",
            // mediainfos autocasts
            mediaInfos: [{
              title: "Chicago Crime and Narcotics Rates",
              type: "column-chart",
              caption: "Crime rate in comparison to narcotics rate",
              value: {
                theme: "Julie",
                fields: ["CrimeRate", "NarcoticsR"],
              }
            }]
          }
        ]
      });

    // create FeatureLayer
    const fl = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Chicago_Crime_Tracts/FeatureServer/0",
        popupTemplate: popupTemplate,
        outFields: ["*"],
        renderer: renderer
    }); 

    // create MapView
    view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [-87.66453728281347, 41.840392306471315],
        popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false
            }
          }
    });

    // setup Legend
    const legend = new Legend({
        view: view,
        layerInfos: [{
            layer: fl,
            title: "Chicago Crime Tracts"
          }
        ]
      });

    // add Legend widget to view's UI
    view.ui.add(legend, "top-right");

    // add FeatureLayer fl to map when MapView is loaded
    view.when(function() {
        map.add(fl);
    });
});
