import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { GovComponent } from './gov.component';
import { CompanyComponent } from './company.component';
import { DriverComponent } from './driver.component';
import { Logger } from './logger.service';
import { WebService } from './web.service';
import { MapService } from './map.service';
import { AlertManager } from './alert.manager';

import './rx-operators';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		NgbModule.forRoot(),
		RouterModule.forRoot([
			{
				path: 'login',
				redirectTo: '/newlogin',
			},
			{
				path: 'driver',
				redirectTo: '/newdriver',
			},
			{
				path: "gov/:mode",
				redirectTo: '/newgov/:mode',
			},
			{
				path: "company",
				redirectTo: '/newcompany',
			},
			{
				path: 'newlogin',
				component: LoginComponent,
			},
			{
				path: 'newdriver',
				component: DriverComponent
			},
			{
				path: "newgov/:mode",
				component: GovComponent
			},
			{
				path: "newcompany",
				component: CompanyComponent
			},
			{
				path: '',
				redirectTo: '/newlogin',
				pathMatch: 'full'
			}
		])
	],
	declarations: [
		AppComponent,
		LoginComponent,
		DriverComponent,
		GovComponent,
		CompanyComponent
	],
	bootstrap: [AppComponent],
	providers: [
		WebService,
		Logger,
		MapService,
		AlertManager
	]
})
export class AppModule { }
