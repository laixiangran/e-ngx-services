# e-ngx-services

基于Angular的一些常用的服务。

## Usage

1. Install

	```shell
	npm install --save e-ngx-services@latest
	```

3. Add the ENgxCheckedModule

	```typescript
	import {ENgxServicesModule} from "e-ngx-services";
	@NgModule({
	    imports: [
	        ENgxServicesModule
	    ]
	})
	```

5. Use in Typescript

	```typescript
	constructor(public transformService: TransformService) {
       this.transformService.wgs2gcj(160, 40); // 这里只举例，其它服务使用方法一致
    }
	```

## API

### AMapWebService 高德地图web服务

#### Property

- `amapWebApiKey: string` - 高德地图web服务所需的key

#### Method

- `poiSearch(text: string, city?: string): Observable<any>` - 关键字搜索。`text` - 关键字，`city` - 查询城市，可选输入内容包括：指定城市的中文（如北京）、指定城市的中文全拼（beijing）、citycode（010）、adcode（110000）

- `geocode(address: string, city?: string): Observable<any>` - 地理编码。`address` - 结构化地址信息:省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码，`city` - 查询城市，可选输入内容包括：指定城市的中文（如北京）、指定城市的中文全拼（beijing）、citycode（010）、adcode（110000）

- `regeocode(location: string): Observable<any>` - 逆地理编码。`location` - 经度在前，纬度在后，经纬度间以“,”分割，经纬度小数点后不要超过 6 位

- `weatherInfo(adcode: number): Observable<any>` - 根据行政区编码获取天气预报信息。`adcode` - 行政区编码

### DateTimeService 通用日期时间操作服务

#### Property

- `locale: any` - 针对primeng中Calendar的本地配置

#### Method

- `dateFormat(value: any, fmt: string): string` - 时间格式化。`value` - 可转化为时间的值，`fmt` - 格式化模板（完整版：yyyy-MM-dd hh:mm:ss.S qq，q为季度）

- `timeFormat(value: number): string` - 将秒数格式化成hh:mm:ss。`value` - 秒数

### EventsService 自定义全局事件服务，用来在全应用中通过发布/订阅事件来进行通信

#### Method

- `subscribe(topic: string, ...handlers: Function[]): void` - 通过事件主题订阅相应事件。`topic` - 订阅事件的主题，`handlers` - 事件处理方法

- `unsubscribe(topic: string, handler: Function = null): boolean` - 通过事件主题取消订阅相应事件，取消成功返回`true`。`topic` - 取消订阅事件的主题，`handlers` - 指定取消该事件主下的处理方法

- `publish(topic: string, ...args: any[]): any[]` - 通过事件主题订阅相应事件。`topic` - 发布事件的主题，`args` - 通过事件发送的数据

### FilePathService 文件路径操作服务

#### Interface

- `FilePathInfo {path: string, name: string, extension: string, mimeType: string}` - 坐标转换返回的接口对象，数据结构为{path: string, name: string, extension: string, mimeType: string}

#### Method

- `resolveFilePath(filePath: string): FilePathInfo` - 根据文件路径分析文件名、扩展名、mimeType。`filePath` - 文件完整路径

- `getMimeType(extension: string): string` - 根据扩展名获取mimeType。`extension` - 文件扩展名

### GeolocationService 兼容W3C标准的定位服务。Extra只能在基于ionic开发的安卓APP中返回且依赖cordova-plugin-baidu-geolocation插件。

#### Interface

- `Extra {type: number, gpsAccuracyStatus: number, addr: string}` - 定位返回的扩展信息，数据结构为{type: number, gpsAccuracyStatus: number, addr: string}

- `Location {watchId?: number, position: Position, extra: Extra}` - 定位返回的位置信息，数据结构为{watchId?: number, position: Position, extra: Extra}

- `PositionResult {code: string, info: string, result: Location}` - （监测）定位返回的结果信息，数据结构为{code: string, info: string, result: Location}

#### Method

- `getCurrentPosition(positionOptions: PositionOptions): Observable<PositionResult>` - 获取当前位置。`positionOptions` - 参考W3C标准中的PositionOptions对象

- `watchPosition(positionOptions: PositionOptions): Observable<PositionResult>` - 持续追踪位置变更。`positionOptions` - 参考W3C标准中的PositionOptions对象

- `clearWatch(watchId: number): void` - 清除位置追踪。`watchId` - 要清除的持续追踪id

### TransformService 地理坐标(WGS-84)、火星坐标(GCJ-02)互转服务

xxLng为xx坐标系下的经度，xxLat为xx坐标系下的纬度，均用十进制表示。

#### Interface

- `Location {lng: number, lat: number}` - 坐标转换返回的接口对象，数据结构为{lng: number, lat: number}

#### Method

- `wgs2gcj(wgsLng: number, wgsLat: number): Location` - 地理坐标(WGS-84)转火星坐标(GCJ-02)

- `gcj2wgs(gcjLng: number, gcjLat: number): Location` - 火星坐标(GCJ-02)转地理坐标(WGS-84)

## Develop

	```shell
	npm install // 安装依赖包
	
	npm start // 启动项目
	```

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
