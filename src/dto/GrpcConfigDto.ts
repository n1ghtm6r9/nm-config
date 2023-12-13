import { Field } from '@nmxjs/validation';
import { GrpcConfigServiceDto } from './GrpcConfigServiceDto';

export class GrpcConfigDto {
  @Field({
    type: GrpcConfigServiceDto,
    array: true,
  })
  services: GrpcConfigServiceDto[];
}
