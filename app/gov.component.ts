import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { HomeViewModel, topic } from 'esri-mods';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { SystemInfo } from './model/system-info';
import { Road } from './model/road';
import { Company } from './model/company';

@Component({
    moduleId: module.id,
    selector: 'gov-app',
    templateUrl: "html/gov.html",
    styleUrls: ["css/gov.css"]
})
export class GovComponent implements OnInit {

    mode: string;
    weather: SystemInfo;
    roadList: Road[];
    companyList: Company[];

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initMap();
        this.route.params.forEach((params: Params) => {
            this.mode = params['mode'];
        });
        this.log.d(this.mode);

        this.webService.getSystemInfo()
            .subscribe(weather => {
                this.weather = weather;
                this.getData();
            })
    }

    initMap(): void {

        // window.dojoRequire(["esri/Map",
        //     "esri/views/MapView",
        //     "esri/layers/MapImageLayer",
        //     "dojo/ready"
        // ], function (Map, MapView, MapImageLayer) {
        //     var map = new Map({
        //         basemap: "streets"
        //     });
        //     // Listen for any layer being added or removed in the Map
        //     map.allLayers.on("change", function (event) {
        //         console.log("Layer added: ", event.added);
        //         console.log("Layer removed: ", event.removed);
        //         console.log("Layer moved: ", event.moved);
        //     });
        //     var layer = new MapImageLayer({
        //         url: "http://222.73.7.71/arcgis/rest/services/test/MapServer"
        //     });
        //     map.add(layer);
        //     var view = new MapView({
        //         container: "map",
        //         map: map
        //     });
        //     var viewProperties = {
        //         center: [120, 30],
        //         zoom: 6
        //     };
        //     view.set(viewProperties);
        // });
    }

    getData(): void {
        this.webService.getRoads(this.weather.time)
            .subscribe(roadList => {
                this.roadList = roadList;
            });
        this.webService.getCompanies(this.weather.time)
            .subscribe(companyList => {
                this.companyList = companyList;
            });
    }

}