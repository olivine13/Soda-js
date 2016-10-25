import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Logger } from './logger.service';
import { WebService } from './web.service';

@Component({
	moduleId:module.id,
	selector: 'my-app',
	template: `
		<nav class="navigation">
			<a class="nav_login" routerLink="/login">登录</a>
			<a [hidden]="isHiddenSwitch" class="nav_switch" (click)="onSwitch()">切换</a>
			<a class="nav_back" (click)="onGoBack()">退后</a>
		</nav>
        <router-outlet></router-outlet>
	`,
	styleUrls: ["css/app.css"]
})
export class AppComponent implements OnInit {

	isHiddenSwitch: boolean;

	constructor(private log: Logger, private webService: WebService, private location: Location, private router: Router) {
	}

	ngOnInit() {
		this.log.d("app component init");
		if (this.location.path().includes("login")) {
			this.isHiddenSwitch = true;
		} else {
			this.isHiddenSwitch = false;
		}
	}

	onSwitch(): void {
		if (this.location.path().endsWith("gov/company")) {
			this.router.navigate(["/gov", "road"]);
		} else if (this.location.path().endsWith("gov/road")) {
			this.router.navigate(["/gov", "company"]);
		} else if (this.location.path().endsWith("company/driver")) {
			this.router.navigate(["/company", "car"]);
		} else if (this.location.path().endsWith("company/car")) {
			this.router.navigate(["/company", "driver"]);
		}
	}

	onGoBack(): void {
		this.location.back();
	}
}