import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { SystemInfo } from './model/system-info';
import { Road } from './model/road';
import { Driver } from './model/driver';

// import Map from 'esri/Map';
// import MapView from 'esri/views/MapView';
// import MapImageLayer from 'esri/layers/MapImageLayer';

@Component({
    selector: 'driver-app',
    templateUrl: "app/html/driver.html",
    styleUrls: ["app/css/app.css"]
})
export class DriverComponent implements OnInit {

    username: string;
    id: string;
    driver: Driver;

    roadname: string;

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute, private _mapService: MapService) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.username = params['username'];
            this.id = params['id'];
        });
        this._mapService.initMap("map");
        this.webService.getDriver("00001")
            .subscribe(driver => {
                this.driver = driver;
            })
    }

    onShowRoad(): void {
        if (this.roadname) {
            console.debug(this.roadname);
        }
    }

    onSortRoad(type): void {
        this.driver.roadList.sort(type == 0 ? (n1, n2) => parseInt(n1.id, 10) - parseInt(n2.id, 10) : (n1, n2) => n1.rate - n2.rate);
    }
}