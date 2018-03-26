/**
 * Created by laixiangran on 2018/1/26.
 * homepage：http://www.laixiangran.cn.
 * 高德地图web服务
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AMapWebService {
	private webAPIKey: string = '55f909211b9950837fba2c71d0488db9'; // 高德Web服务API类型Key
	private webAPIUrl: string = 'http://restapi.amap.com/v3/';

	constructor(public http: HttpClient) {
	}

	/**
	 * 关键字搜索
	 * @param {string} params 请求参数
	 * @returns {Observable<any>}
	 */
	poiSearch(params: any): Observable<any> {
		return this.http.get(encodeURI(`${this.webAPIUrl}place/text?${this.foramtParams(params)}`));
	}

	/**
	 * 地理编码
	 * @param {string} params 请求参数
	 * @returns {Observable<any>}
	 */
	geocode(params: any): Observable<any> {
		return this.http.get(encodeURI(`${this.webAPIUrl}geocode/geo?${this.foramtParams(params)}`));
	}

	/**
	 * 逆地理编码
	 * @param {string} params 请求参数
	 * @returns {Observable<any>}
	 */
	regeocode(params: any): Observable<any> {
		return this.http.get(encodeURI(`${this.webAPIUrl}geocode/regeo?${this.foramtParams(params)}`));
	}

	/**
	 * 根据行政区编码获取天气预报信息
	 * @param {string} params 请求参数
	 * @returns {Observable<any>}
	 */
	weatherInfo(params: any): Observable<any> {
		return this.http.get(encodeURI(`${this.webAPIUrl}weather/weatherInfo?${this.foramtParams(params)}`));
	}

	/**
	 * 设置web API key
	 * @param {string} key
	 */
	setWebAPIKey(key: string): void {
		this.webAPIKey = key;
	}

	/**
	 * 获取web APi key
	 * @returns {string}
	 */
	getWebAPIKey(): string {
		return this.webAPIKey;
	}

	/**
	 * 格式化参数，所有参数均使用和号字符(&)进行分隔
	 * @param params
	 * @returns {string}
	 */
	private foramtParams(params: any): string {
		const paramArr: string[] = [];
		for (const p in params) {
			if (params.hasOwnProperty(p)) {
				paramArr.push(`${p}=${params[p]}`);
			}
		}
		if (!params.key) {
			paramArr.push(`key=${this.getWebAPIKey()}`);
		}
		return paramArr.join('&');
	}
}
