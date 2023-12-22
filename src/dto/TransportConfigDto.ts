import { Field } from '@nmxjs/validation';
import { TransportConfigServiceDto } from './TransportConfigServiceDto';
import { TransporterEnumType } from '../interfaces';

export class TransportConfigDto {
  @Field({
    type: { TransporterEnumType },
    enum: true,
  })
  type: TransporterEnumType;

  @Field({
    type: TransportConfigServiceDto,
    array: true,
  })
  services: TransportConfigServiceDto[];
}
