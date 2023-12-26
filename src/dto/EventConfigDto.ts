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

  @Field({
    type: String,
    nullable: true,
  })
  username?: string;

  @Field({
    type: String,
    nullable: true,
  })
  password?: string;
}
