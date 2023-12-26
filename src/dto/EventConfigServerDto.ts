import { Field } from '@nmxjs/validation';

export class EventConfigServerDto {
  @Field({
    type: String,
    nullable: true,
  })
  host?: string;

  @Field({
    type: Number,
    nullable: true,
  })
  port?: number;

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
