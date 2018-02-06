import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {ENgxServicesModule} from '../../src/e-ngx-services.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ENgxServicesModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
