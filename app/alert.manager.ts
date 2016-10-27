import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertManager {

    alerts: Array<IAlert> = [];

    openAlert(alert: IAlert) {
        this.alerts.push(alert);
        Observable.of(alert)
            .delay(2000)
            .subscribe(alert => this.closeAlert(alert));
    }

    closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        if(index>=0) this.alerts.splice(index, 1);
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}