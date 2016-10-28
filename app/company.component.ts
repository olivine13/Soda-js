import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { Driver } from './model/driver';
import { Car } from './model/car';
import { AlertManager } from './alert.manager';

@Component({
    selector: 'company-app',
    templateUrl: "app/html/company.html",
    styleUrls: ["app/css/company.css", "app/css/app.css"]
})
export class CompanyComponent implements OnInit {

    mode: string;
    driverList: Driver[];
    carList: Car[];

    username: string;
    driverId: string;

    selectDriver: Driver;
    selectCar: Car;

    constructor(private log: Logger,
        private webService: WebService,
        private route: ActivatedRoute,
        private _mapService: MapService,
        private _alertManager: AlertManager) {
    }

    ngOnInit() {
        this._mapService.initMap("map");

        this.route.queryParams
            .subscribe(params => {
                this.mode = params['mode'] || 'none';
                this.username = params['id'] || 'none';
            });

        this.webService.getDrivers()
            .subscribe(drivers => {
                this.driverList = drivers;
            });

        this.webService.getCars()
            .subscribe(cars => {
                this.carList = cars;
                Observable.from(cars)
                    .delay(500)
                    .subscribe(car => {
                        this._mapService.addPictureMark({
                            url: "app/images/car.png",
                            width: "24px",
                            height: "24px"
                        },
                            car.latitude,
                            car.lontitude);
                    });
            });
    }

    onShowDriver(): void {
        if (this.driverId) {
            var flag: boolean = false;
            this.driverList.forEach(driver => {
                if (driver.id === this.driverId) {
                    this.selectDriver = driver;
                    flag = true;
                    return;
                }
            });
            if (!flag) this._alertManager.openAlert({ id: 2, type: 'info', message: '没有找到对应司机' });
            else {
                //找到对应司机后，显示司机数据
                this._mapService.showLayerByDriverId(this.driverId);
            }
        } else {
            this._alertManager.openAlert({ id: 1, type: 'danger', message: '输入不能为空' });
        }
    }

    onSortDrivers(type): void {
        this.driverList.sort(
            type == 0 ?
                (n1, n2) => n1.rank - n2.rank : (n1, n2) => n2.change - n1.change
        );
    }

    onShowCar(): void {
        if (this.driverId) {
            var flag: boolean = false;
            this.carList.forEach(car => {
                if (car.driverId === this.driverId) {
                    this.selectCar = car;
                    flag = true;
                    return;
                }
            });
            if (!flag) this._alertManager.openAlert({ id: 2, type: 'info', message: '没有找到对应司机' });
        } else {
            this._alertManager.openAlert({ id: 1, type: 'danger', message: '输入不能为空' });
        }
    }

    onSortCars(type): void {
        this.carList.sort(
            type == 0 ?
                (n1, n2) => { return n1.empty ? 0 : 1 } : (n1, n2) => n1.onlinetime - n2.onlinetime
        );
    }
}