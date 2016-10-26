import { Injectable } from '@angular/core';

@Injectable()
export class AlertManager {

    alerts: Array<IAlert> = [];

    openAlert(alert: IAlert) {
        this.alerts.push(alert);
    }

    closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}

export interface IAlert {
    id: number;
    type: string;
    message: string;
}