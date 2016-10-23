import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from './logger.service';
import { WebService } from './web.service';

@Component({
    moduleId: module.id,
    selector: 'login-app',
    templateUrl: "html/login.html",
    styleUrls:["css/login.css"]
})
export class LoginComponent implements OnInit {

    username:string;
    password:string;
    redirectUrl:string;

    constructor(private log: Logger, private webService: WebService, private router: Router) {
    }

    ngOnInit() {
    }


    onLogin():void {
        //根据输入用户名登录不同页面

        // Create a dummy session id
        if (this.username == "123@driver.com") {
        	this.redirectUrl ='/driver';
        } else if (this.username == "123@gov.com") {
        	this.redirectUrl = "/gov";
        } else if (this.username == "123@company.com") {
        	this.redirectUrl = "/company";
        } else {
        	this.redirectUrl = "/driver";
        }
        this.router.navigate([this.redirectUrl,"road"]);
    }

    private randonGUID() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
}