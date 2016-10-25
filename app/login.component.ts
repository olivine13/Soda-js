import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Logger } from './logger.service';
import { WebService } from './web.service';

@Component({
    selector: 'login-app',
    templateUrl: "app/html/login.html",
    styleUrls: ["app/css/login.css"]
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(private log: Logger, private webService: WebService, private router: Router) {
    }

    ngOnInit() {
    }


    onLogin(): void {
        //根据输入用户名登录不同页面

        // Create a dummy session id
        var redirectUrl: any;
        var param: any;
        var id = this.username.substring(0, this.username.indexOf("@"));
        var username = this.username;
        if (this.username === "123@driver.com") {
            redirectUrl = '/driver';

            let navigationExtras: NavigationExtras = {
                queryParams: { 'id': id, 'username': username },
                fragment: 'anchor'
            };
            this.router.navigate([redirectUrl], navigationExtras);
        } else if (this.username === "123@gov.com") {
            redirectUrl = "/gov";
            param = 'road';

            this.router.navigate([redirectUrl, param]);
        } else if (this.username === "123@company.com") {
            redirectUrl = "/company"; let navigationExtras: NavigationExtras = {
                queryParams: { 'id': id, 'username': username, 'mode': 'driver' },
                fragment: 'anchor'
            };
            this.router.navigate([redirectUrl], navigationExtras);
        }
    }

    private randonGUID() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
}