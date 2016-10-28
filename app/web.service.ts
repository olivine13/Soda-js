import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Logger } from './logger.service';
import { Road, RoadBean } from './model/road';
import { SystemInfo } from './model/system-info';
import { Driver } from './model/driver';
import { Company, ICompanyInfo } from './model/company';
import { Car } from './model/car';

const url_base: string = 'http://222.73.7.71/';
const url_driver: string = 'soda/drivers/';
const url_road: string = 'soda/way_index/';

@Injectable()
export class WebService {

	constructor(private log: Logger, private http: Http) {
	}

	getSystemInfo(): Observable<SystemInfo> {
		// return this.http.get('')
		// .map(res=>res.json())
		// .mergeMap(json=>Observable.of(json));
		return Observable.of(new SystemInfo(new Date().getDay(), 8, "sunny"));
	}

	getRoads(date): Observable<Road[]> {
		// this.http.get(url_base + url_road +);
		var list: Road[] = [];
		for (var i = 0; i < 50; i++) {
			list.push(new Road('000' + i, '共和-鲁班' + i, 100 - i));
		}
		return Observable.of(list);
	}

	// getRoadPath(date, start, end): Promise<Road> {
	// 	return null;
	// }

	getCompanies(date): Observable<Company[]> {
		return Observable.of([
			new Company("00001", "滴滴出行", 87, 18),
			new Company("00002", "人民优步", 76, 13),
			new Company("00003", "易到用车", 62, 31),
			new Company("00004", "神州租车", 89, 10)
		]);
	}

	getCompanyInfo(id, from, end): Observable<ICompanyInfo[]> {
		var list: ICompanyInfo[] = [];
		for (var i = from; i < end; i++) {
			list.push({
				month: i,
				rate: i + 60,
				accident: i + 20
			});
		}
		return Observable.of(list);
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
			var driver: Driver = new Driver("1613" + i, 80 + i, i, i, "在线", 10, "0000" + i);
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