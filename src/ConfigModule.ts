import * as YAML from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import { DynamicModule, Module, Global } from '@nestjs/common';
import { ValidationModule, validatorKey, IValidator } from '@nmxjs/validation';
import type { RecursivePartial } from '@nmxjs/types';
import { getEnvironment } from '@nmxjs/utils';
import { configKey } from './constants';
import { IConfigModuleOptions, IConfig, ConfigFileExtension } from './interfaces';
import { InvalidConfigFileError } from './errors';
import { DbConfigDto, TransportConfigDto, EventConfigDto, EtcdConfigDto, NotificationConfigDto } from './dto';

@Global()
@Module({
  imports: [ValidationModule],
  exports: [configKey],
})
export class ConfigModule {
  public static register({
    format = ConfigFileExtension.YAML,
    folderPath = path.resolve('config'),
    ...options
  }: IConfigModuleOptions = {}): DynamicModule {
    const environment = getEnvironment();
    const defaultSchemas = {
      db: DbConfigDto,
      cache: DbConfigDto,
      transport: TransportConfigDto,
      etcd: EtcdConfigDto,
      event: EventConfigDto,
      notification: NotificationConfigDto,
    };
    const schemas = {
      ...defaultSchemas,
      ...options.schemas,
    };

    return {
      module: ConfigModule,
      providers: [
        {
          provide: configKey,
          inject: [validatorKey],
          useFactory: (validator: IValidator): Promise<IConfig> =>
            Promise.all(
              Object.entries(schemas).map(async ([fileName, schema]) => {
                const fullPath = path.join(folderPath, fileName.indexOf('.') === -1 ? `${fileName}.${format.toLowerCase()}` : fileName);
                const data = await fs.promises
                  .readFile(fullPath)
                  .then(buffer => (format === ConfigFileExtension.YAML ? YAML.parse(buffer.toString()) : buffer.toJSON()))
                  .then(configData => configData[environment] || configData['default'])
                  .catch(() => null);

                if (!data && !defaultSchemas[fileName]) {
                  throw new InvalidConfigFileError(fileName);
                } else if (!data) {
                  return;
                }

                return {
                  [fileName
                    .split('-')
                    .map((v, i) => (i === 0 ? v : `${v[0].toUpperCase()}${v.substring(1)}`))
                    .join('')]: validator.validate({
                    data,
                    classSchema: schema,
                  }),
                };
              }),
            )
              .then(data =>
                data.reduce(
                  (result, item) => ({
                    ...result,
                    ...item,
                  }),
                  {},
                ),
              )
              .then(data => {
                if (options.callback) {
                  options.callback(data);
                }
                return data;
              }),
        },
      ],
    };
  }

  public static registerForTest<Config extends IConfig>(config: RecursivePartial<Config>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: configKey,
          useValue: config,
        },
      ],
    };
  }
}
