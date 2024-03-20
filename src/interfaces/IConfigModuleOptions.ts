import { ICallback } from '@nmxjs/types';
import { ClassConstructor } from 'class-transformer';
import { ConfigFileExtension } from './ConfigFileExtension';

export interface IConfigModuleOptions {
  folderPath?: string;
  schemas?: Record<string, ClassConstructor<any> | true>;
  format?: ConfigFileExtension;
  notificationsConfig?: boolean;
  callback?: ICallback;
}
