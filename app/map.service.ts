import { Injectable } from '@angular/core'

import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import MapImageLayer from 'esri/layers/MapImageLayer';

@Injectable()
export class MapService {

    initMap(div): void {
        var map = new Map({
            basemap: "streets"
        });
        var layer = new MapImageLayer({
            url: "http://222.73.7.71/arcgis/rest/services/test/MapServer"
        });
        map.add(layer);
        var mapView = new MapView({
            container: div,
            map,
            center: [122.45, 31.75],
            zoom: 8
        });
    }
}