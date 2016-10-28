import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import './rx-operators';

import HighchartsChartObject from 'highcharts';
import HighchartsObject from 'highcharts';
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

    mode: string;
    weather: SystemInfo;
    roadList: Road[];
    companyList: Company[];

    companyname: string;
    roadname: string;

    selectCompany: Company;
    rateChartOptions: HighchartsOptions;
    rateChart: HighchartsChartObject;
    accidentChartOptions: HighchartsOptions;
    accidentChart: HighchartsChartObject;

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
        this.rateChartOptions = {
            title: { text: '企业安全指数' },
            credits: {
                href: '',
                text: 'by 低碳先锋队'
            },
            series:[{
                name:'安全指数'
            }],
            yAxis: {
                title: {
                    text: '安全指数'
                }
            }
        };
        this.accidentChartOptions = {
            title: { text: '企业事故数' },
            credits: {
                href: '',
                text: 'by 低碳先锋队'
            },
            series:[{
                name:'事故数'
            }],
            yAxis: {
                title: {
                    text: '事故数'
                }
            }
        };
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
            });

        //显示默认图层
        Observable.of(this)
            .delay(1000)
            .subscribe(a => a._mapService.showLayerByTimeWithWeather(this.time.hour, this.weatherChecked));
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

    onPickTimeWithWeather(time, weather): void {
        if (this._mapService.showLayerByTimeWithWeather(time, weather)) {
            this._alertManager.openAlert({ id: 1, type: 'success', message: '正在刷新地图，请稍等' });
        } else {
            this._alertManager.openAlert({ id: 1, type: 'warning', message: '没有找到对应数据' });
        }
    }

    onShowRoad(): void {
        if (this.roadname) {
            console.debug(this.roadname);
        } else {
            this._alertManager.openAlert({ id: 1, type: 'danger', message: '输入不能为空' });
        }
    }

    onShowCompany(): void {
        if (this.companyname) {
            //显示当前搜索企业
            var flag: boolean = false;

            Observable.from(this.companyList)
                .filter(company => company.name === this.companyname && !flag)
                .mergeMap(company => {
                    this.selectCompany = company;
                    flag = true;
                    return this.webService.getCompanyInfo(company.id, 1, 8)
                })
                .mergeMap(list => Observable.from(list))
                .subscribe(info => {
                    this.rateChart.series[0].addPoint([info.month, info.accident]);
                    this.accidentChart.series[0].addPoint([info.month, info.accident]);
                }, () => {
                    if (!flag) this._alertManager.openAlert({ id: 1, type: 'info', message: '没有找到对应企业' });
                });
        } else {
            this.selectCompany = null;
            this._alertManager.openAlert({ id: 1, type: 'danger', message: '输入不能为空' });
        }
    }

    onSortCompany(type): void {
        //如果为0按安全指数排序，否则按事故数排序
        this.companyList.sort(type == 0 ? (n1, n2) => n1.rate - n2.rate : (n1, n2) => n1.accident - n2.accident);
    }

    saveRateChartInstance(instance) {
        this.rateChart = instance;
    }

    saveAccidentChartInstance(instance) {
        this.accidentChart = instance;
    }

}