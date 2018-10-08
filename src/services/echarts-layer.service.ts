/**
 * Created by laixiangran on 2018/9/30.
 * homepage：http://www.laixiangran.cn.
 * 地图加载 echarts
 */

import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable()
export class EchartsLayerService {
	private mapComponent: any;
	private map: any;
	private echartsIntance: any;
	private echartsContainer: any;
	private option: any;
	private data: any[];
	private zoomStart: any;
	private zoomEnd: any;
	private pan: any;
	private panEnd: any;

	constructor() {
	}

	init(mapComponent: any, option: any, data: any[]): void {
		this.mapComponent = mapComponent;
		this.map = this.mapComponent.map;
		this.data = data;
		this.option = option;
		this.addEvent();
		this.create();
	}

	/**
	 * 设置属性
	 * @param option
	 */
	setOption(option: any): void {
		this.option = Object.assign(this.option, option);
		this.addEvent();
		this.render();
	}

	/**
	 * 设置数据
	 * @param {any[]} data
	 */
	setData(data: any[]): void {
		this.data = data;
		this.addEvent();
		this.render();
	}

	/**
	 * 清空 echarts 当前实例，会移除实例中所有的组件和图表并移除地图事件
	 */
	clear(): void {
		if (this.echartsIntance) {
			this.removeEvent();
			this.echartsIntance.clear();
		}
	}

	/**
	 * 销毁 echarts 实例，销毁后实例无法再被使用
	 */
	dispose(): void {
		if (this.echartsIntance) {
			this.removeEvent();
			this.echartsIntance.dispose();
		}
	}

	/**
	 * 清除地图事件
	 */
	private removeEvent() {
		this.zoomStart.remove();
		this.zoomEnd.remove();
		this.pan.remove();
		this.panEnd.remove();
	}

	/**
	 * 绑定地图事件
	 */
	private addEvent() {
		this.zoomStart = this.map.on('zoom-start', this.hideChart.bind(this));
		this.zoomEnd = this.map.on('zoom-end', this.showChart.bind(this));
		this.pan = this.map.on('pan', this.hideChart.bind(this));
		this.panEnd = this.map.on('pan-end', this.showChart.bind(this));
	}

	private hideChart() {
		this.echartsContainer.style.visibility = 'hidden';
	}

	private showChart() {
		this.echartsIntance.resize();
		this.echartsContainer.style.visibility = 'visible';
		this.render();
	}

	private create() {
		this.echartsContainer = document.createElement('div');
		this.echartsContainer.style.position = 'absolute';
		this.echartsContainer.style.height = this.map.height + 'px';
		this.echartsContainer.style.width = this.map.width + 'px';
		this.echartsContainer.style.top = 0;
		this.echartsContainer.style.left = 0;
		this.map.__container.appendChild(this.echartsContainer);
		this.echartsIntance = echarts.init(this.echartsContainer);
		setTimeout(() => {
			this.render();
		})
	}

	private render() {
		const option = Object.assign(JSON.parse(JSON.stringify(this.option)), {
			xAxis: [],
			yAxis: [],
			grid: [],
			series: []
		});
		this.data.forEach((obj, index) => {
			const screenPoint = this.map.toScreen(new this.mapComponent.Point(obj.x, obj.y, this.map.spatialReference));
			const coord = [screenPoint.x, screenPoint.y];
			const idx: string = index + '';
			const opt = JSON.parse(JSON.stringify(this.option));
			const xAxis = opt.xAxis;
			const yAxis = opt.yAxis;
			const grid = opt.grid;
			const series = opt.series;
			option.xAxis.push(Object.assign(xAxis, {
				id: idx,
				gridId: idx,
				name: typeof xAxis.name !== 'undefined' ? obj.name : '',
				data: obj.xData
			}));
			option.yAxis.push(Object.assign(yAxis, {
				id: idx,
				gridId: idx
			}));
			option.grid.push(Object.assign(grid, {
				id: idx,
				left: coord[0] - grid.width / 2,
				top: coord[1] - grid.height / 2
			}));
			option.series.push(Object.assign(series, {
				id: idx,
				xAxisId: idx,
				yAxisId: idx,
				data: obj.seriesData,
				itemStyle: {
					normal: {
						color: (params) => {
							const colorList = obj.color;
							return colorList[params.dataIndex];
						}
					}
				}
			}));
		});
		this.echartsIntance.setOption(option);
	}
}
