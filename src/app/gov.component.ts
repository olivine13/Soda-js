import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { SystemInfo } from './model/system-info';
import { Road } from './model/road';
import { Company } from './model/company';

@Component({
    moduleId:module.id,
    selector: 'gov-app',
    templateUrl: "html/gov.html",
    styleUrls: ["css/gov.css"]
})
export class GovComponent implements OnInit {

    mode: string;
    weather: SystemInfo;
    roadList: Road[];
    companyList: Company[];

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute,private _mapService:MapService) {
    }

    ngOnInit() {
        this._mapService.initMap("map");
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