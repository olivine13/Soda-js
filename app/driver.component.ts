import { Component, ElementRef, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { SystemInfo } from './model/system-info';
import { Road } from './model/road';
import { Driver } from './model/driver';
import { AlertManager } from './alert.manager';

// import Map from 'esri/Map';
// import MapView from 'esri/views/MapView';
// import MapImageLayer from 'esri/layers/MapImageLayer';

@Component({
    selector: 'driver-app',
    templateUrl: "app/html/driver.html",
    styleUrls: ["app/css/app.css"]
})
export class DriverComponent implements OnInit, DoCheck {

    username: string;
    id: string;
    driver: Driver;

    roadname: string;

    constructor(private log: Logger,
        private webService: WebService,
        private route: ActivatedRoute,
        private _mapService: MapService,
        private _alertManager: AlertManager) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                console.debug(JSON.stringify(params));
                this.id = params['id'] || 'none';
                this.username = params['username'] || 'none';
            });
        this._mapService.initMap("map", "streets-night-vector");

        this.webService.getDriver(this.id)
            .subscribe(driver => {
                this.driver = driver;
            });
    }

    ngDoCheck() {
        this._mapService.showLayerByDriverId(this.id);
    }

    onShowRoad(): void {
        if (this.roadname) {
            this.driver.roadList = [];
            this.webService.getRoadBean(this.driver.id, this.roadname)
                .finally(() => {
                    if (this.driver.roadList.length <= 0) this._alertManager.openAlert({ id: 2, type: 'info', message: '没有找到对应路段' });
                })
                .subscribe(road => {
                    this.driver.roadList.push(road);
                });
        } else {
            this.driver.roadList = [];
            this.webService.getRoadBean(this.driver.id, this.roadname)
                .subscribe(road => {
                    this.driver.roadList.push(road);
                }, () => {
                    if (this.driver.roadList.length <= 0) this._alertManager.openAlert({ id: 2, type: 'info', message: '没有找到对应路段' });
                });
        }
    }

    onSortRoad(type): void {
        this.driver.roadList.sort(type == 0 ? (n1, n2) => parseInt(n1.id, 10) - parseInt(n2.id, 10) : (n1, n2) => n1.rate - n2.rate);
    }
}