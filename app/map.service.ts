import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import Collection from 'esri/core/Collection';
import Basemap from 'esri/Basemap';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import Graphic from 'esri/Graphic';
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import MapImageLayer from 'esri/layers/MapImageLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';

const MAP_SERVICE_URL = 'http://222.73.7.71/arcgis/rest/services/shenyangnew/MapServer';
const LAY_ID_MAP = {
    'car-position': 0,
    'sunny-8': 5, 'sunny-13': 1, 'sunny-18': 3, 'rainy-8': 6, 'rainy-13': 2, 'rainy-18': 4,
    'car-16131': 7, 'car-14443': 8, 'car-26687': 9, 'car-23328': 10, 'car-26196': 11
};

@Injectable()
export class MapService {

    map: Map;
    mapView: MapView;
    imageLayer: MapImageLayer;
    markLayer: GraphicsLayer;

    currentSubLayer: number = -1;

    visiableMap: boolean[] = [];

    constructor(private log: Logger) {}

    initMap(div, style = "osm"): void {
        this.map = new Map({
            basemap: style
        });
        this.map.allLayers.on("change", function (event) {
            console.debug("map changed");
            for (var i = 0; i < this.visiableMap; i++) {
                if (this.visiableMap[i]) {
                    this.showLayer(i);
                }
            }
        });
        this.log.d(MAP_SERVICE_URL);
        this.map.add(this.imageLayer = new MapImageLayer({
            url: MAP_SERVICE_URL
        }));
        this.map.add(this.markLayer = new GraphicsLayer());
        this.mapView = new MapView({
            container: div,
            map: this.map,
            center: [123.2960721, 41.8055015],
            zoom: 10
        });
    }

    showLayerByTimeWithWeather(time = 8, weather = "sunny"): boolean {
        if (!LAY_ID_MAP[weather + '-' + time]) return false;
        return this.showLayer(LAY_ID_MAP[weather + '-' + time]);
    }

    showLayerByDriverId(id): boolean {
        if (!LAY_ID_MAP['car-' + id]) return false;
        return this.showLayer(LAY_ID_MAP['car-' + id]);
    }

    showLayerByName(name): boolean {
        return this.showLayer(LAY_ID_MAP[name]);
    }

    hideLayerByName(name): boolean {
        return this.hideLayer(LAY_ID_MAP[name]);
    }

    showLayer(targetId): boolean {
        if (this.visiableMap[targetId]) return true;
        var targetLayer = this.imageLayer.findSublayerById(targetId);
        var currentLayer = this.imageLayer.findSublayerById(this.currentSubLayer);
        console.debug('targetId:' + targetId + ' currentSubLayer:' + this.currentSubLayer);
        if (targetLayer) {
            if (currentLayer) {
                currentLayer.visible = false;
            }
            this.visiableMap[this.currentSubLayer] = false;
            targetLayer.visible = true;
            this.visiableMap[targetId] = targetLayer.visible;

            this.currentSubLayer = targetId;
            return true;
        } else {
            this.visiableMap[targetId] = false;
        }
        return false;
    }

    hideLayer(targetId): boolean {
        if (!this.visiableMap[targetId]) return;
        var targetLayer = this.imageLayer.findSublayerById(targetId);
        this.visiableMap[targetId] = false;
        if (targetLayer) {
            targetLayer.visible = false;
            return true;
        }
        return false;
    }

    addPictureMark(mark, x, y): void {
        this.markLayer.add(Graphic.fromJSON({
            x: x,
            y: y,
            symbol: mark
        }));
    }
}