import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import './rx-operators';

import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { SystemInfo } from './model/system-info';
import { Road } from './model/road';
import { Company } from './model/company';
import { AlertManager } from './alert.manager';

@Component({
    selector: 'gov-app',
    templateUrl: "app/html/gov.html",
    styleUrls: ["app/css/gov.css", "app/css/app.css"]
})
export class GovComponent implements OnInit {

    WEEKDAY = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

    isSearching: boolean = false;
    mode: string;
    weather: SystemInfo;
    roadList: Road[];
    companyList: Company[];

    companyname: string;
    roadname: string;

    selectCompany: Company;

    systemTime: Date = new Date();

    //用户选择查看时间
    time = { hour: 8, minute: 0 };
    spinners = true;
    weatherChecked = "sunny";

    constructor(private log: Logger,
        private webService: WebService,
        private route: ActivatedRoute,
        private _mapService: MapService,
        private _alertManager: AlertManager) {
    }

    ngOnInit() {
        this._mapService.initMap("map");
        this.route.params.forEach((params: Params) => {
            this.mode = params['mode'];
        });

        this.webService.getSystemInfo()
            .subscribe(weather => {
                this.weather = weather;
            });
        this.webService.getCompanies()
            .subscribe(companyList => {
                this.companyList = companyList;
            });
        //显示默认图层
        Observable.of(this)
            .delay(2000)
            .subscribe(a => {
                //默认显示12、13图层
                a.getData(this.roadname,this.time.hour,this.weatherChecked);
            });
    }

    getData(name, time, weather): void {
        //获取路段数据
        this.isSearching = true;
        this.roadList = [];
        this.webService.getRoads(name, time, weather === "sunny" ? 0 : 1)
            .finally(() => this.isSearching = false)
            .flatMap(roadList => Observable.from(roadList))
            .subscribe(road => this.roadList.push(road),
            error => { console.debug(error) });
    }

    onPickTimeWithWeather(name, time, weather): void {
        this.weatherChecked = weather;
        if (this._mapService.showLayerByTimeWithWeather(time, weather)) {
            this._alertManager.openAlert({ id: 1, type: 'success', message: '正在刷新地图，请稍等' });
        } else {
            this._alertManager.openAlert({ id: 1, type: 'warning', message: '没有找到对应数据' });
        }
    }

    onShowRoad(name, time, weather): void {
        // if (name) {
            this.getData(name, time, weather);
        // } else {
        //     this._alertManager.openAlert({ id: 1, type: 'danger', message: '输入不能为空' });
        // }
    }

    onShowCompany(): void {
        if (this.companyname) {
            //显示当前搜索企业
            var flag: boolean = false;
            this.companyList = [];
            this.webService.getCompanies()
                .finally(() => {
                    if (!flag) this._alertManager.openAlert({ id: 1, type: 'info', message: '没有找到对应企业' });
                })
                .flatMap(list => Observable.from(list))
                .filter(company => company.name === this.companyname)
                .take(1)
                .subscribe(company => {
                    this.selectCompany = company;
                    flag = true;
                    this.companyList.push(company);
                });
            // for (var i = 0; i < this.rateChart.series[0].data.length; i++) {
            //     this.rateChart.series[0].removePoint(i);
            //     this.accidentChart.series[0].removePoint(i);
            // }
            // Observable.from(this.companyList)

            //     .filter(company => company.name === this.companyname)
            //     .take(1)
            //     .subscribe(company => {
            //         this.selectCompany = company;
            //         flag = true;
            //         return this.webService.getCompanyInfo(company.id, 1, 8)
            //     });
            // .mergeMap(list => Observable.from(list))
            // .subscribe(info => {
            //     this.rateChart.series[0].addPoint([info.month, info.rate]);
            //     this.accidentChart.series[0].addPoint([info.month, info.accident]);
            // });

            var index = ['14443', '16131', '26196'];
            var id = index[Math.round(Math.random() * 4)];
            console.debug(id);
            this._mapService.showLayerByDriverId(id);
        } else {
            this.selectCompany = null;
            this.companyList = [];
            this.webService.getCompanies()
                .flatMap(list => Observable.from(list))
                .subscribe(company => {
                    this.companyList.push(company);
                });
        }
    }

    onSortCompany(type): void {
        //如果为0按安全指数排序，否则按事故数排序
        this.companyList.sort(type == 0 ? (n1, n2) => n1.rate - n2.rate : (n1, n2) => n1.accident - n2.accident);
    }

}