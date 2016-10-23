import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Logger } from './logger.service'
import { Road } from './model/road';
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
		return Observable.of([
			new Road('0001', '共和-鲁班', 80),
			new Road('0002', '嘉定-徐汇', 82),
			new Road('0003', '武定-南站', 75),
			new Road('0004', '中山-莘庄', 86),
			new Road('0005', '西站-金山', 81)
		]);
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

	// getDriver(id): Promise<Driver> {
	// 	return null;
	// }

	getDrivers(): Observable<Driver[]> {
		var test: Driver[];
		for (let i = 1; i < 10; i++) {
			test.push(new Driver("0000"+i,80+i,i,i,"在线",10,"0000"+i));
		}
		return Observable.of(test);
	}

	// getCar(): Promise<Car> {
	// 	return null;
	// }
}