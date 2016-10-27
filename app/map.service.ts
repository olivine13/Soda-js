import { Injectable } from '@angular/core';

import Collection from 'esri/core/Collection';
import Basemap from 'esri/Basemap';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import MapImageLayer from 'esri/layers/MapImageLayer';

const MAP_SERVICE_URL = 'http://222.73.7.71/arcgis/rest/services/SafetyMap/MapServer';
const LAY_ID_MAP = {
    'sunny-8': 4, 'sunny-13': 0, 'sunny-18': 2, 'rainy-8': 5, 'rainy-13': 1, 'rainy-18': 3,
    'car-16131': 6, 'car-14443': 7, 'car-26687': 8, 'car-23328': 9, 'car-26196': 10
};

@Injectable()
export class MapService {

    map: Map;
    mapView: MapView;
    imageLayer: MapImageLayer;

    currentSubLayer: number = -1;

    initMap(div, style = "osm"): void {
        this.map = new Map({
            basemap: style
        });
        this.map.add(this.imageLayer = new MapImageLayer({
            url: MAP_SERVICE_URL
        }));
        this.mapView = new MapView({
            container: div,
            map: this.map,
            center: [121.43029797761215, 31.277403882152259],
            zoom: 10
        });
    }

    showLayerByTimeWithWeather(time = 8, weather = "sunny"): boolean {
        return this.showLayer(LAY_ID_MAP[weather + '-' + time]);
    }

    showLayerByDriverId(id): boolean {
        return this.showLayer(LAY_ID_MAP['car-' + id]);
    }

    showLayer(targetId): boolean {
        var targetLayer = this.imageLayer.findSublayerById(targetId);
        var currentLayer = this.imageLayer.findSublayerById(this.currentSubLayer);
        if (targetLayer) {
            if (currentLayer) {
                currentLayer.visible = false;
            }
            targetLayer.visible = true;
            this.currentSubLayer = targetId;
            return true;
        }
        return false;
    }
}