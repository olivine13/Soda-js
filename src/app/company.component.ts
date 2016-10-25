import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
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

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute, private _mapService: MapService) {
    }

    ngOnInit() {
        this._mapService.initMap("map");
        this.route.params.forEach((params: Params) => {
            this.mode = params['mode'];
        });

        this.webService.getDrivers()
            .subscribe(drivers => {
                this.driverList = drivers;
            });
    }
}