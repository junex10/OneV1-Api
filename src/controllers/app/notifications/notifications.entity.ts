import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO {
  @ApiProperty({ required: true })
  user_id: number;
}
