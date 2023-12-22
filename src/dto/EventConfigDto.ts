import { Field } from '@nmxjs/validation';
import { EventTypeEnum } from '../interfaces';

export class EventConfigDto {
  @Field({
    type: { EventTypeEnum },
    enum: true,
  })
  type: EventTypeEnum;

  @Field({
    type: String,
    array: true,
  })
  servers: string[];

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
