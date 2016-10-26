import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Logger } from './logger.service';
import { WebService } from './web.service';

import { Observable } from 'rxjs/Observable';
import { IAlert, AlertManager } from './alert.manager';

@Component({
    selector: 'my-app',
    template: `
		<nav class="navigation">
			<a class="nav_login" routerLink="/login">登录</a>
			<a class="nav_switch" (click)="onSwitch()"><span [hidden]="isHiddenSwitch">切换模式</span></a>
			<a class="nav_back" (click)="onGoBack()">退后</a>
		</nav>
		<p *ngFor="let alert of alerts">
  			<ngb-alert [type]="alert.type" (close)="closeAlert(alert)">{{ alert.message }}</ngb-alert>
		</p>
        <router-outlet></router-outlet>
	`,
    styleUrls: ["app/css/app.css"]
})
export class AppComponent implements OnInit, DoCheck {

    isHiddenSwitch: boolean;
    alerts: Array<IAlert> = [];

    constructor(private log: Logger, private webService: WebService, private location: Location,
        private router: Router,
        private _alertManager: AlertManager) {
        this.alerts = this._alertManager.alerts;
    }

    ngOnInit() {
        this.log.d("app component init");
    }

    ngDoCheck() {
        //登录模式和司机模式禁用切换钮
        if (this.location.path().includes("/login") || this.location.path().includes("/driver")) {
            this.isHiddenSwitch = true;
        } else {
            this.isHiddenSwitch = false;
        }
    }

    closeAlert(alert: IAlert) {
        this._alertManager.closeAlert(alert);
    }

    onSwitch(): void {
        var url = this.location.path();
        if (url.endsWith("/gov/company")) {
            this.router.navigate(["/gov", "road"]);
        } else if (url.endsWith("/gov/road")) {
            this.router.navigate(["/gov", "company"]);
        } else if (url.startsWith("/company") && url.includes("mode=driver")) {
            var request = this.getRequest(url);
            request['mode'] = 'car';
            let navigationExtras: NavigationExtras = {
                queryParams: request
            };
            this.router.navigate(["/company"], navigationExtras);
        } else if (url.startsWith("/company") && url.includes("mode=car")) {
            var request = this.getRequest(url);
            request['mode'] = 'driver';
            let navigationExtras: NavigationExtras = {
                queryParams: request
            };
            this.router.navigate(["/company"], navigationExtras);
        }
    }

    onGoBack(): void {
        this.location.back();
    }

    getRequest(url): Object {
        var request = {};
        var strs: string[] = url.substr(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < strs.length; i++) {
            request[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
        return request;
    }
}