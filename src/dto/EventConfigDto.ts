import { Field } from '@nmxjs/validation';
import { EventTypeEnum } from '../interfaces';
import { EventConfigServerDto } from './EventConfigServerDto';

export class EventConfigDto {
  @Field({
    type: { EventTypeEnum },
    enum: true,
  })
  type: EventTypeEnum;

  @Field({
    type: EventConfigServerDto,
    array: true,
  })
  servers: EventConfigServerDto[];
}
