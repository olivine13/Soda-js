import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Rx';

import { Logger } from './logger.service';
import { Road, RoadBean } from './model/road';
import { SystemInfo } from './model/system-info';
import { Driver } from './model/driver';
import { Company, ICompanyInfo } from './model/company';
import { Car } from './model/car';

import './rx-operators';

const url_base: string = 'http://222.73.7.71/';
const url_driver: string = 'soda/drivers/page?';
const url_road: string = 'soda/way_index/page?';

function getStringFormat(pageNum, pageSize, index) {
	return 'pageNum=' + pageNum + '&pageSize=' + pageSize + '&way_index=' + index;
}

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
		return this.http.get('app/json/road_info.json')
			.map(response => {
				var roadList: Road[] = [];
				var array = response.json();
				for (var i = 0; i < array.length; i++) {
					var o = array[i];
					roadList.push(new Road(o['wid'], o['name'], o['score']));
				}
				return roadList;
			})
			.take(500)
			.subscribeOn(Scheduler.asap)
			.observeOn(Scheduler.asap);
		// return this.http.get(url_base + url_road + getStringFormat(1, 10, '{}'))
		// 	.flatMap(response => {
		// 		var size: number[] = response.json()['data']['navigatepageNums'];
		// 		return Observable.from(size);
		// 	})
		// 	.flatMap(pageNum => {
		// 		return this.http.get(url_base + url_road + getStringFormat(pageNum, 10, '{}'));
		// 	})
		// 	.map(response => {
		// 		var roadList: Road[] = [];
		// 		var list = response.json()['data']['list'];
		// 		for (var i = 0; i < list.length; i++) {
		// 			roadList.push(new Road(list[i]['wid'], list[i]['name'], list[i]['score']));
		// 		}
		// 		return roadList;
		// 	});
		// return Observable.of(list);
	}

	getRoadBean(id): Observable<RoadBean[]> {
		return this.http.get(url_base + url_driver + "{car_id:" + id + "}")
			.map(response => {
				var roadList: RoadBean[] = [];
				var list = response.json()['data']['list'];
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					var bean: RoadBean = new RoadBean(o['wid'], parseFloat(o['score'].toFixed(2)));
					bean.name = '路段升级中';
					roadList.push(bean);
				}
				return roadList;
			});
	}

	getCompanies(date): Observable<Company[]> {
		return Observable.of([
			new Company("00001", "滴滴出行", 87, 18),
			new Company("00002", "人民优步", 76, 13),
			new Company("00003", "易到用车", 62, 31),
			new Company("00004", "微打车", 77, 12),
			new Company("00005", "摇摇招车", 95, 8),
			new Company("00006", "打车小秘", 80, 10),
			new Company("00007", "一号专车", 78, 11),
			new Company("00008", "罗技找车", 69, 26),
			new Company("00009", "51打的", 71, 22)
		]);
	}

	getCompanyInfo(id, from, end): Observable<ICompanyInfo[]> {
		return this.getCompanies("")
			.flatMap(list => Observable.from(list))
			.filter(company => company.id === id)
			.map(company => {
				var list: ICompanyInfo[] = [];
				for (var i = from; i < end; i++) {
					list.push({
						month: i,
						rate: company.rate + this.GetRandomNum(-5, 5),
						accident: company.rate + Math.round(this.GetRandomNum(-5, 5))
					});
				}
				return list;
			});
	}

	//获取指定id司机信息
	getDriver(id): Observable<Driver> {
		return this.getRoadBean(id)
			.map(list => {
				var driver: Driver = new Driver(id, 87, 1, 1, "online", 10, id);
				driver.roadList = list;
				return driver;
			});
	}

	//获取所有司机信息
	getDrivers(): Observable<Driver[]> {
		// var test: Driver[] = [];
		// //测试路段数据
		// var roadList: RoadBean[] = [];
		// for (var i = 0; i < 40; i++) {
		// 	var road = new RoadBean("0000" + i, "延河-鲁班" + i);
		// 	road.rate = 100 - i;
		// 	roadList.push(road);
		// }
		// for (let i = 1; i < 30; i++) {
		// 	var driver: Driver = new Driver("1613" + i, 80 + i, i, i, "在线", 10, "0000" + i);
		// 	driver.addRoadsAll(roadList);
		// 	test.push(driver);
		// }
		// return this.http.get(url_base + url_driver + getStringFormat(1, 10, '{}'))
		// 	.flatMap(response => {
		// 		var size: number[] = response.json()['data']['navigatepageNums'];
		// 		return Observable.from(size);
		// 	})
		// 	.flatMap(pageNum => {
		// 		console.debug('pageNum:' + pageNum);
		// 		return this.http.get(url_base + url_driver + getStringFormat(pageNum, 10, '{}'));
		// 	})
		// 	.map(response => {
		// 		var roadList: RoadBean[] = [];
		// 		for (var i = 0; i < 40; i++) {
		// 			var road = new RoadBean("0000" + i, "延河-鲁班" + i);
		// 			road.rate = 100 - i;
		// 			roadList.push(road);
		// 		}

		// 		var driverList: Driver[] = [];
		// 		var list = response.json()['data']['list'];
		// 		for (var i = 0; i < list.length; i++) {
		// 			var o = list[i];
		// 			console.debug(JSON.stringify(o));
		// 			var rd: number = parseFloat(this.GetRandomNum(-0.5, 0.5).toFixed(2));
		// 			driverList.push(new Driver(
		// 				o['car_id'] + '',
		// 				o['score'],
		// 				o['grade'],
		// 				rd,
		// 				rd > 0.2 || rd < -0.3 ? "在线" : "离线",
		// 				this.GetRandomNum(10, 30),
		// 				o['carId']
		// 			));
		// 		}
		// 		return driverList;
		// 	});
		// return Observable.of(test);
		return this.http.get('app/json/driver_info.json')
			.map(response => {
				var driverList: Driver[] = [];
				var list = response.json();
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					console.debug(JSON.stringify(o));
					var rd: number = parseFloat(this.GetRandomNum(-0.5, 0.5).toFixed(2));
					driverList.push(new Driver(
						o['car_id'] + '',
						parseFloat(o['rate']),
						parseInt(o['rank']),
						rd,
						o['status'],
						o['onlinetime'],
						o['car_id']
					));
				}
				return driverList;
			});
	}

	getCar(id): Observable<Car> {
		return this.http.get('app/json/car_info.json')
			.flatMap(response => {
				var list: Car[] = [];
				var array = response.json();
				for (var i = 0; i < array.length; i++) {
					var o = array[i];
					var car: Car = new Car(o['carID']
						, o['carID']
						, "沪A000" + Math.round(this.GetRandomNum(10, 98))
						, parseFloat(o['lat'])
						, parseFloat(o['lon'])
						, o['empty'] === "1");
					car.gpstime = o['timestamp'];
					car.direction = parseInt(o['direction']);
					car.elevated = o['elevated'] === "1";
					car.brake = o['brake'] === "1";
					car.speed = parseFloat(o['speed']);
					list.push(car);
				}
				return Observable.from(list);
			})
			.filter(car => car.driverId === id)
			.take(1);
	}

	getCars(): Observable<Car[]> {
		return this.http.get(url_base + url_driver + getStringFormat(1, 10, '{}'))
			.flatMap(response => {
				var size: number[] = response.json()['data']['navigatepageNums'];
				return Observable.from(size);
			})
			.flatMap(pageNum => {
				return this.http.get(url_base + url_road + getStringFormat(pageNum, 10, '{}'));
			})
			.map(response => {
				var carList: Car[] = [];
				var list = response.json()['data']['list'];
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					var rd: number = this.GetRandomNum(-0.5, 0.5);
					var car: Car = new Car(o['carId'],
						o['car_id'],
						"沪A0" + Math.round(this.GetRandomNum(1000, 9999)),
						0,
						0,
						rd > 0.2 || rd < -0.3);
					car.break = (o['brake'] == 0);
					car.speed = o['speed'];
					car.direction = o['degree'];
					car.elevated = rd > 0.1 || rd < -0.35;
					carList.push(car);
				}
				return carList;
			});
		// var list: Car[] = [];
		// for (var i = 0; i < 50; i++) {
		// 	var car: Car;
		// 	if (i % 2 == 0) {
		// 		car = new Car("000" + i, "0000" + i, "沪AA00" + i, 121 + 0.01 * i, 31 + 0.01 * i, true);
		// 		car.speed = 25 + i;
		// 	} else {
		// 		car = new Car("000" + i, "0000" + i, "沪BB00" + i, 121.5 - 0.03 * i, 31.6 - 0.02 * i, false);
		// 		car.speed = 0;
		// 	}

		// 	list.push(car);
		// }
		// return Observable.of(list);
	}

	GetRandomNum(Min, Max): number {
		var Range = Max - Min;
		var Rand = Math.random();
		return (Min + Rand * Range);
	}
}