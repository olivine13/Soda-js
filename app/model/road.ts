export class Road {

	baseList: RoadBean[];

	constructor(public id:string,public name:string,public rate:number) {}
}

export class RoadBean {
	id:string;
	
	name: string;

	latitude: number;

	lontitude: number;
}