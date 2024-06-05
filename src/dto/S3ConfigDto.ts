import { Field } from '@nmxjs/validation';

export class S3ConfigDto {
  @Field({
    type: String,
  })
  accessKey: string;

  @Field({
    type: String,
  })
  secretKey: string;

  @Field({
    type: String,
  })
  endpoint: string;

  @Field({
    type: String,
  })
  bucket: string;
}
