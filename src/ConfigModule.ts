import { DynamicModule, Module, Global } from '@nestjs/common';
import { ValidationModule, validatorKey, IValidator } from '@nmxjs/validation';
import type { RecursivePartial } from '@nmxjs/types';
import { configKey } from './constants';
import { IConfigModuleOptions, IConfig } from './interfaces';
import { getConfig } from './utils';

const buildProviders = (options: IConfigModuleOptions = {}) => {
  return [
    {
      provide: configKey,
      inject: [validatorKey],
      useFactory: (validator: IValidator) =>
        getConfig({
          ...options,
          validator,
        }),
    },
  ];
};

@Global()
@Module({
  imports: [ValidationModule],
  providers: buildProviders(),
  exports: [configKey],
})
export class ConfigModule {
  public static register(options: IConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: buildProviders(options),
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
