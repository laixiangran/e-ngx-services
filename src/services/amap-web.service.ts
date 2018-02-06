/**
 * Created by laixiangran on 2018/1/26.
 * homepage：http://www.laixiangran.cn.
 * 高德地图web服务
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AMapWebService {
	amapWebApiKey: string = '55f909211b9950837fba2c71d0488db9'; // 高德地图web服务所需的key

	constructor(public http: HttpClient) {
	}

	/**
	 * 关键字搜索
	 * @param {string} text 关键字
	 * @param {string} city 查询城市
	 * @returns {Observable<any>}
	 */
	poiSearch(text: string, city?: string): Observable<any> {
		return this.http.get(`http://restapi.amap.com/v3/place/text?keywords=${text}&city=${city}&offset=20&key=${this.amapWebApiKey}&extensions=all`);
	}

	/**
	 * 地理编码
	 * @param {string} address 结构化地址信息:省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码
	 * @param {string} city 查询城市
	 * @returns {Observable<any>}
	 */
	geocode(address: string, city?: string): Observable<any> {
		return this.http.get(`http://restapi.amap.com/v3/geocode/geo?address=${address}&output=JSON&city=${city}&key=${this.amapWebApiKey}`);
	}

	/**
	 * 逆地理编码
	 * @param {string} location 经度在前，纬度在后，经纬度间以“,”分割，经纬度小数点后不要超过 6 位
	 * @returns {Observable<any>}
	 */
	regeocode(location: string): Observable<any> {
		return this.http.get(`http://restapi.amap.com/v3/geocode/regeo?location=${location}&output=JSON&key=${this.amapWebApiKey}&extensions=all`);
	}

	/**
	 * 根据行政区编码获取天气预报信息
	 * @param {number} adcode 行政区编码
	 * @returns {Observable<any>}
	 */
	weatherInfo(adcode: number): Observable<any> {
		return this.http.get(`http://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${this.amapWebApiKey}&extensions=all`);
	}
}
