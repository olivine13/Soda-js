import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { GovComponent } from './gov.component';
import { CompanyComponent } from './company.component';
import { DriverComponent } from './driver.component';
import { Logger } from './logger.service';
import { WebService } from './web.service';

import './rx-operators';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'driver',
				component: DriverComponent
			},
			{
				path: "gov/:mode",
				component: GovComponent
			},
			{
				path: "company/:mode",
				component: CompanyComponent
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
		Logger
	]
})
export class AppModule { }
