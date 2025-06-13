import { ApiProperty } from '@nestjs/swagger';

export class SetFriendsDTO {
  @ApiProperty({ required: true })
  sender_id: number;
  @ApiProperty({ required: true })
  receiver_id: number;
  @ApiProperty({ required: false })
  status: number;
}
export class GetFriendsDTO {
  @ApiProperty({ required: true })
  user_id: number;
}
export class CheckFriendSubscriptionDTO {
  @ApiProperty({ required: true })
  user_id: number;
  @ApiProperty({ required: true })
  friend_id: number;
}
