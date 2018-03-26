import {Component} from '@angular/core';
import {AMapWebService} from '../../src';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(public aMapWebService: AMapWebService) {
		this.aMapWebService.poiSearch({
			keywords: '肯德基',
			city: '北京市',
			offset: 20,
			page: 1
		}).subscribe((data: any) => {
			console.log(data.pois);
		});
	}
}
