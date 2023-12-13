import { Field } from '@nmxjs/validation';

export class EtcdConfigDto {
  @Field({
    type: String,
    array: true,
  })
  hosts: string[];
}
