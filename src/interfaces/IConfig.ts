import type { DbConfigDto, GrpcConfigDto, EtcdConfigDto } from '../dto';

export interface IConfig {
  db?: DbConfigDto;
  cache?: DbConfigDto;
  grpc?: GrpcConfigDto;
  etcd?: EtcdConfigDto;
  [key: string]: Record<string, any>;
}
