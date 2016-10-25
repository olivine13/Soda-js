import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { Driver } from './model/driver';
import { Car } from './model/car';

@Component({
    selector: 'company-app',
    templateUrl: "app/html/company.html",
    styleUrls: ["app/css/company.css"]
})
export class CompanyComponent implements OnInit {

    mode: string;
    driverList: Driver[];
    carList: Car[];

    driverId: string;

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute, private _mapService: MapService) {
    }

    ngOnInit() {
        this._mapService.initMap("map");
        this.route.queryParams.forEach((params: Params) => {
            this.mode = params['mode'];
        });

        this.webService.getDrivers()
            .subscribe(drivers => {
                this.driverList = drivers;
            });

        this.webService.getCars();
    }

    onShowDriver(): void {
        if (this.driverId) {
            console.debug(this.driverId);
        }
    }

    onSortDrivers(type): void {
        this.driverList.sort(
            type == 0 ?
                (n1, n2) => n1.rank - n2.rank : (n1, n2) => n1.change - n2.change
        );
    }

    onShowCar(): void {
        if (this.driverId) {
            console.debug(this.driverId);
        }
    }

    onSortCars(type): void {
        this.carList.sort(
            type == 0 ?
                (n1, n2) => { return n1.empty ? 0 : 1 } : (n1, n2) => n1.onlinetime - n2.onlinetime
        );
    }
}