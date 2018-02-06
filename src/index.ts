/**
 * Created by laixiangran on 2016/11/23.
 * homepage：http://www.laixiangran.cn.
 */
import {ENgxServicesModule} from './e-ngx-services.module';
import {Extra, GeolocationService, PositionResult} from './services/geolocation.service';
import {AMapWebService} from './services/amap-web.service';
import {EventsService} from './services/events.service';
import {FilePathInfo, FilePathService} from './services/filepath.service';
import {LngLat, TransformService} from './services/transform.service';
import {DateTimeService} from './services/datetime.service';

export { ENgxServicesModule } from './e-ngx-services.module'
export { AMapWebService } from './services/amap-web.service'
export { GeolocationService, Extra, Location, PositionResult } from './services/geolocation.service'
export { EventsService } from './services/events.service'
export { FilePathService, FilePathInfo } from './services/filepath.service'
export { TransformService, LngLat } from './services/transform.service'
export { DateTimeService } from './services/datetime.service'
