import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
	d(msg: any)   { console.log(msg); }
	e(msg: any) { console.error(msg); }
	w(msg: any)  { console.warn(msg); }
}