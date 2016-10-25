export class Road {

	baseList: RoadBean[];

	constructor(public id: string, public name: string, public rate: number) { }
}

export class RoadBean {

	latitude: number;

	lontitude: number;

	rate: number;

	constructor(public id: string, public name: string) { }
}