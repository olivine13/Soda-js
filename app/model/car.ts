export class Car {
    /**
     * 	{
            "id":"00001",	//车辆id
            "driver":"00001",	//所属司机id
            "number":"沪XXXXXX",		//车牌信息
            "gpstime":"09:10:30",	//gps时间
            "latitude":121.3885,	//纬度
            "lontitude":31.2697, 	//经度
            "empty":true,	//是否是空车
            "speed":29,	//速度
            "direction":21,	//方向角度，角度值(单位)
            "brake":true,	//刹车状态
            "elevated":true	,	//是否在高架
        }
     */
    public speed:number;
    public direction:number;
    public break:boolean;
    public elevated:boolean;
    public onlinetime:number;

    constructor(public id: string, public driverId: string, public number: string,
        public latitude: number, public lontitude: number,
        public empty: boolean) { }
}