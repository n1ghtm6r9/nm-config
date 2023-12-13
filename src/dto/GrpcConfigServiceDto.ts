import { Field } from '@nmxjs/validation';

export class GrpcConfigServiceDto {
  @Field({
    type: String,
  })
  name: string;

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
