import { Field } from '@nmxjs/validation';

export class NotificationTelegramConfigDto {
  @Field({
    type: String,
  })
  token: string;

  @Field({
    type: Number,
  })
  chatId: number;
}
