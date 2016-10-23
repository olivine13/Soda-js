import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { Driver } from './model/driver';
import { Car } from './model/car';

@Component({
    moduleId: module.id,
    selector: 'company-app',
    templateUrl: "html/company.html",
    styleUrls: ["css/company.css"]
})
export class CompanyComponent implements OnInit {

    mode: string;
    driverList: Driver[];

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initMap();
        this.route.params.forEach((params: Params) => {
            this.mode = params['mode'];
        });

        this.webService.getDrivers()
            .subscribe(drivers => {
                this.driverList = drivers;
            });
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
}