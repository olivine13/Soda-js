import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Logger } from './logger.service';
import { Road, RoadBean } from './model/road';
import { SystemInfo } from './model/system-info';
import { Driver } from './model/driver';
import { Company } from './model/company';
import { Car } from './model/car';

@Injectable()
export class WebService {

	constructor(private log: Logger) {
	}

	getSystemInfo(): Observable<SystemInfo> {
		return Observable.of(new SystemInfo(1, 1, "sunny"));
	}

	getRoads(date): Observable<Road[]> {
		var list: Road[] = [];
		for (var i = 0; i < 50; i++) {
			list.push(new Road('000' + i, '共和-鲁班'+i, 100 - i));
		}
		return Observable.of(list);
		// return Observable.of([
		// 	new Road('0002', '嘉定-徐汇', 82),
		// 	new Road('0003', '武定-南站', 75),
		// 	new Road('0004', '中山-莘庄', 86),
		// 	new Road('0005', '西站-金山', 81)
		// ]);
	}

	// getRoadPath(date, start, end): Promise<Road> {
	// 	return null;
	// }

	getCompanies(date): Observable<Company[]> {
		return Observable.of([
			new Company("滴滴出行", 87, 18),
			new Company("人民优步", 76, 13),
			new Company("易到用车", 62, 31),
			new Company("神州租车", 89, 10)
		]);
	}

	getDriver(id): Observable<Driver> {
		var roadList: RoadBean[] = [];
		for (var i = 0; i < 40; i++) {
			var road = new RoadBean("0000" + i, "延河-鲁班" + i);
			road.rate = 100 - i;
			roadList.push(road);
		}
		var driver = new Driver(id, 87, 1, 1, "online", 10, "00001");
		driver.addRoadsAll(roadList);
		return Observable.of(driver);
	}

	getDrivers(): Observable<Driver[]> {
		var test: Driver[] = [];
		//测试路段数据
		var roadList: RoadBean[] = [];
		for (var i = 0; i < 40; i++) {
			var road = new RoadBean("0000" + i, "延河-鲁班" + i);
			road.rate = 100 - i;
			roadList.push(road);
		}
		for (let i = 1; i < 30; i++) {
			var driver: Driver = new Driver("0000" + i, 80 + i, i, i, "在线", 10, "0000" + i);
			driver.addRoadsAll(roadList);
			test.push(driver);
		}
		return Observable.of(test);
	}

	getCars(): Observable<Car[]> {
		var list: Car[] = [];
		for (var i = 0; i < 50; i++) {
			var car: Car;
			if (i % 2 == 0) {
				car = new Car("000" + i, "0000" + i, "沪AA00" + i, 121 + 0.01 * i, 31 + 0.01 * i, true);
				car.speed = 25 + i;
			} else {
				car = new Car("000" + i, "0000" + i, "沪BB00" + i, 121.5 - 0.03 * i, 31.6 - 0.02 * i, false);
				car.speed = 0;
			}

			list.push(car);
		}
		return Observable.of(list);
	}
}