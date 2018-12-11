/**
 * Created by laixiangran on 2018/1/25.
 * homepage：http://www.laixiangran.cn.
 * 兼容W3C标准的定位服务
 * Extra目前用在使用ionic开发的安卓APP中，只能在安卓手机上返回且依赖cordova-plugin-baidu-geolocation插件。
 * 安装方法：cordova plugin add https://github.com/laixiangran/cordova-plugin-baidu-geolocation --variable API_KEY=百度分配的AK --save
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

/**
 * 定位返回的扩展信息
 */
export interface Extra {
	type: number, // 定位类型。161：网络定位结果，61：GPS定位结果，66：离线定位结果
	gpsAccuracyStatus: number, // GPS质量。0：GPS质量判断未知，1：GPS质量判断好，2：GPS质量判断中等，3：GPS质量判断差
	addr: string // 详细地址信息
}

export interface Location {
	watchId?: number,
	position: Position,
	extra: Extra
}

export interface PositionResult {
	code: string,
	info: string,
	result: Location
}

@Injectable()
export class GeolocationService {
	watchId: number;

	constructor() {
	}

	/**
	 * 获取当前位置
	 * @param {PositionOptions} positionOptions
	 * @returns {Observable<any>}
	 */
	getCurrentPosition(positionOptions?: PositionOptions): Observable<PositionResult> {
		return new Observable<PositionResult>((subscriber: Subscriber<PositionResult>) => {
			navigator.geolocation.getCurrentPosition((...args: any[]) => {
				const position: Position = args[0],
					extra: Extra = args[1],
					location: Location = {
						position: position,
						extra: extra
					};
				subscriber.next({
					code: 'ok',
					info: '定位成功！',
					result: location
				});
			}, (error: PositionError) => {
				subscriber.error({
					code: 'error',
					info: '定位失败！',
					result: error
				});
			}, positionOptions);
		});
	}

	/**
	 * 持续追踪位置变更
	 * @param {PositionOptions} positionOptions
	 * @param {boolean} isBackgroundMode
	 * @returns {Observable<PositionResult>}
	 */
	watchPosition(positionOptions?: PositionOptions, isBackgroundMode: boolean = false): Observable<PositionResult> {
		this.clearWatch();
		return new Observable<PositionResult>((subscriber: Subscriber<PositionResult>) => {
			this.watchId = navigator.geolocation.watchPosition((...args: any[]) => {
				const position: Position = args[0],
					extra: any = args[1],
					location: Location = {
						position: position,
						extra: extra
					};
				subscriber.next({
					code: 'ok',
					info: '定位成功！',
					result: location
				});
			}, (error: PositionError) => {
				subscriber.error({
					code: 'error',
					info: '定位失败！',
					result: error
				});
				subscriber.complete();
			}, positionOptions);

			if (isBackgroundMode) {
				this.openFrontLocationService();
			} else {
				this.closeFrontLocationService();
			}
		});
	}

	/**
	 * 清除位置追踪
	 */
	clearWatch(): void {
		navigator.geolocation.clearWatch(this.watchId);
		this.closeFrontLocationService();
		this.watchId = null;
	}

	/**
	 * 开启前台定位服务
	 */
	openFrontLocationService(): void {
		if (navigator.geolocation['openFrontLocationService']) {
			navigator.geolocation['openFrontLocationService'](this.watchId);
		}
	}

	/**
	 * 关闭前台定位服务
	 */
	closeFrontLocationService(): void {
		if (navigator.geolocation['closeFrontLocationService']) {
			navigator.geolocation['closeFrontLocationService'](this.watchId);
		}
	}
}
