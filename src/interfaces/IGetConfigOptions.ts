import { IValidator } from '@nmxjs/validation';
import { IConfigModuleOptions } from './IConfigModuleOptions';

export interface IGetConfigOptions extends IConfigModuleOptions {
  validator?: IValidator;
}
