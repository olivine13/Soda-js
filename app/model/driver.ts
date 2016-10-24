import { RoadBean } from './road'

export class Driver {

    roadList: RoadBean[];

    constructor(
        public id: string,
        public rate: number,
        public rank: number,
        public change: number,
        public status: string,
        public onlinetime: number,
        public carId: string) {
        this.roadList = [];
    }

    addRoad(road): void {
        this.roadList.push(road);
    }

}