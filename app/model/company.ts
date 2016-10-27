export class Company implements ICompanyInfo {
    constructor(
        public id:string,
        public name: string,
        public rate: number,
        public accident: number,
        public month:number = 0
    ) { }
}

export interface ICompanyInfo {
    month:number;
    rate:number;
    accident:number;
}