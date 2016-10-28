declare var System: any;
declare var esriSystem: any;

// load Esri modules with the help of esri-system-js library
esriSystem.register([
    'esri/core/Collection',
    'esri/geometry/Point',
    'esri/geometry/geometryEngineAsync',
    'esri/Graphic',
    'esri/layers/MapImageLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/layers/WebTileLayer',
    'esri/layers/support/TileInfo',
    'esri/Basemap',
    'esri/Map',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    "esri/symbols/PictureMarkerSymbol",
    'esri/views/MapView',
    'esri/views/SceneView'
], function () {
    // bootstrap the app
    // System.import('app/main')
    System.import('app')
        .then(null, console.error.bind(console));
});
