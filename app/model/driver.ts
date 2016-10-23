export class Driver {
    constructor(
        public id: string,
        public rate: number,
        public rank: number,
        public change: number,
        public status: string,
        public onlinetime: number,
        public carId: string) { }
}