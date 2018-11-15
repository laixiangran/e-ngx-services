import { Component } from '@angular/core';
import { AMapWebService, FileDownloadError, FileDownloadResult, FileOperationObject, FileOperationService } from '../../src';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	fileOperationObject: FileOperationObject;

	constructor(public aMapWebService: AMapWebService,
				public fileOperationService: FileOperationService) {
	}

	poiSearch() {
		this.aMapWebService.poiSearch({
			keywords: '肯德基',
			city: '北京市',
			offset: 20,
			page: 1
		}).subscribe((data: any) => {
			console.log(data.pois);
		});
	}

	download() {
		this.fileOperationObject = this.fileOperationService.create();
		this.fileOperationObject.download('http://localhost:4200/assets/styles/splash.css', {
			isSavaAs: true,
			fileName: 'splash.css',
			onProgress: (evt: ProgressEvent) => {
				console.log('download', evt.loaded / evt.total * 100);
			}
		}).then((result: FileDownloadResult) => {
			console.log(result);
		}, (error: FileDownloadError) => {
			console.log(error);
		});
	}

	abort() {
		this.fileOperationObject.abort();
	}
}
