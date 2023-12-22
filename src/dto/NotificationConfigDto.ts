import { Field } from '@nmxjs/validation';
import { NotificationTelegramConfigDto } from './NotificationTelegramConfigDto';

export class NotificationConfigDto {
  @Field({
    type: NotificationTelegramConfigDto,
    array: true,
    nullable: true,
  })
  telegrams?: NotificationTelegramConfigDto[];
}
