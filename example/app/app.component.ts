import { Component } from '@angular/core';
import { AMapWebService, FileDownloadError, FileDownloadResult, FileOperationObject } from '../../src';
import { FileOperationService } from '../../src/services/file-operation.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(public aMapWebService: AMapWebService, public fileOperationService: FileOperationService) {

		// 测试 aMapWebService
		this.aMapWebService.poiSearch({
			keywords: '肯德基',
			city: '北京市',
			offset: 20,
			page: 1
		}).subscribe((data: any) => {
			console.log(data.pois);
		});

		// 测试 fileOperationService
		const fileOperationObject: FileOperationObject = this.fileOperationService.create();
		fileOperationObject.download('http://localhost:4200/assets/styles/splash.css', {
			onProgress: (evt: ProgressEvent) => {
				console.log(evt);
			}
		}).then((result: FileDownloadResult) => {
			console.log(result);
		}, (error: FileDownloadError) => {
			console.log(error);
		});
	}
}
