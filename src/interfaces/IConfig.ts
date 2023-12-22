import type { DbConfigDto, TransportConfigDto, EventConfigDto, EtcdConfigDto, NotificationConfigDto } from '../dto';

export interface IConfig {
  db?: DbConfigDto;
  cache?: DbConfigDto;
  transport?: TransportConfigDto;
  etcd?: EtcdConfigDto;
  event?: EventConfigDto;
  notification?: NotificationConfigDto;
  [key: string]: Record<string, any>;
}
