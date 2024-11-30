import * as YAML from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import objHash from 'object-hash';
import { getEnvironment } from '@nmxjs/utils';
import { InvalidConfigFileError } from '../errors';
import { IGetConfigOptions, IConfig, ConfigFileExtension } from '../interfaces';
import { DbConfigDto, TransportConfigDto, EventConfigDto, EtcdConfigDto, NotificationConfigDto, S3ConfigDto } from '../dto';

const configsMap: Map<string, IConfig> = new Map();

export function getConfig({
  format = ConfigFileExtension.YAML,
  folderPath = path.resolve('config'),
  validator,
  ...options
}: IGetConfigOptions = {}): IConfig {
  const hash = objHash({
    format,
    folderPath,
    validator: Boolean(validator),
    callback: Boolean(options.callback),
    schemas: options.schemas,
    notificationsConfig: options.notificationsConfig,
  });

  const existConfig = configsMap.get(hash);

  if (existConfig && options.callback) {
    options.callback(existConfig);
  }

  if (existConfig) {
    return existConfig;
  }

  const environment = getEnvironment();
  const defaultSchemas = {
    s3: S3ConfigDto,
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

  const data = Object.entries(schemas)
    .map(([fileName, schema]) => {
      const fullPath = path.join(folderPath, fileName.indexOf('.') === -1 ? `${fileName}.${format.toLowerCase()}` : fileName);
      const buffer = fs.readFileSync(fullPath);
      const configData = format === ConfigFileExtension.YAML ? YAML.parse(buffer.toString()) : buffer.toJSON();
      const data = configData[environment] || configData['default'];

      if (!data && !defaultSchemas[fileName]) {
        throw new InvalidConfigFileError(fileName);
      } else if (!data) {
        return;
      }

      return {
        [fileName
          .split('-')
          .map((v, i) => (i === 0 ? v : `${v[0].toUpperCase()}${v.substring(1)}`))
          .join('')]:
          <unknown>schema === true || !validator
            ? data
            : validator.validate({
                data,
                classSchema: schema,
              }),
      };
    })
    .reduce(
      (result, item) => ({
        ...result,
        ...item,
      }),
      {},
    );

  if (options.callback) {
    options.callback(data);
  }

  configsMap.set(hash, data);

  return data;
}
