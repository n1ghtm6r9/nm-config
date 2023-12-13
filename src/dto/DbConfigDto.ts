import GraphQLJSON from 'graphql-type-json';
import { Field } from '@nmxjs/validation';

export class DbConfigDto {
  @Field({
    type: String,
  })
  type: any;

  @Field({
    type: String,
  })
  host: string;

  @Field({
    type: Number,
  })
  port: number;

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

  @Field({
    type: String,
    nullable: true,
  })
  database?: string;

  @Field({
    type: GraphQLJSON,
    nullable: true,
  })
  options?: Record<string, any>;
}
