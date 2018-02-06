import {Component} from '@angular/core';
import {TransformService} from '../../src/services/transform.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	wgs84: any = [116.299881, 40.046242];
	gcj: any = [116.397477, 39.908692];

	constructor(public transformService: TransformService) {
		this.testTransformService();
	}

	testTransformService() {
		console.log('火星坐标：', this.transformService.wgs2gcj(this.wgs84[0], this.wgs84[1]));
		console.log('地理坐标：', this.transformService.gcj2wgs(this.gcj[0], this.gcj[1]));
	}
}
