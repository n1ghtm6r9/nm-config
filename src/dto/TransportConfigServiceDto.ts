import { Field } from '@nmxjs/validation';

export class TransportConfigServiceDto {
  @Field({
    type: String,
    nullable: true,
  })
  name?: string;

  @Field({
    type: Number,
    nullable: true,
  })
  port?: number;

  @Field({
    type: String,
    nullable: true,
  })
  host?: string;
}
