import type { DbConfigDto, TransportConfigDto, EventConfigDto, EtcdConfigDto, NotificationConfigDto, S3ConfigDto } from '../dto';

export interface IConfig {
  s3?: S3ConfigDto;
  db?: DbConfigDto;
  cache?: DbConfigDto;
  transport?: TransportConfigDto;
  etcd?: EtcdConfigDto;
  event?: EventConfigDto;
  notification?: NotificationConfigDto;
  [key: string]: Record<string, any>;
}
