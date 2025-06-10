import { ApiProperty } from '@nestjs/swagger';

export class SetFriendsDTO {
  @ApiProperty({ required: true })
  sender_id: number;
  @ApiProperty({ required: true })
  receiver_id: number;
  @ApiProperty({ required: true })
  status: number;
}
export class GetFriendsDTO {
  @ApiProperty({ required: true })
  user_id: number;
}
