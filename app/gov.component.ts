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
    selector: 'gov-app',
    templateUrl: "app/html/gov.html",
    styleUrls: ["app/css/gov.css","app/css/app.css"]
})
export class GovComponent implements OnInit {

    mode: string;
    weather: SystemInfo;
    roadList: Road[];
    companyList: Company[];

    companyname:string;
    roadname:string;

    constructor(private log: Logger, private webService: WebService, private route: ActivatedRoute, private _mapService: MapService) {
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

    onShowRoad():void {
        if(this.roadname) {
            console.debug(this.roadname);
        }
    }

    onShowCompany():void {
        if(this.companyname) {
            //显示当前搜索企业
            console.debug(this.companyname);
        }
    }

    onSortCompany(type): void {
        //如果为0按安全指数排序，否则按事故数排序
        this.companyList.sort(type == 0 ? (n1, n2) => n1.rate - n2.rate : (n1, n2) => n1.accident - n2.accident);
    }

}