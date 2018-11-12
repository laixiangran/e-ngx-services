/**
 * Created by laixiangran on 2016/11/29.
 * homepage：http://www.laixiangran.cn.
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AMapWebService } from './services/amap-web.service';
import { DateTimeService } from './services/datetime.service';
import { EventsService } from './services/events.service';
import { FilePathService } from './services/filepath.service';
import { GeolocationService } from './services/geolocation.service';
import { TransformService } from './services/transform.service';
import { EchartsLayerService } from './services/echarts-layer.service';
import { FileOperationService } from './services/file-operation.service';

const services: any[] = [
	AMapWebService,
	DateTimeService,
	EventsService,
	FilePathService,
	FileOperationService,
	GeolocationService,
	TransformService,
	EchartsLayerService
];

@NgModule({
	imports: [
		HttpClientModule
	],
	providers: services
})
export class ENgxServicesModule {

}
