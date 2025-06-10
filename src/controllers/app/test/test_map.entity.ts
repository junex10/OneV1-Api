import { ApiProperty } from '@nestjs/swagger';

export class SetEvents {
  @ApiProperty({ required: true })
  user_id: number;
  @ApiProperty({ required: true })
  event_type_id: number;
  @ApiProperty({ required: true })
  main_pic: string;
  @ApiProperty({ required: true })
  content: string;
  @ApiProperty({ required: true })
  latitude: number;
  @ApiProperty({ required: true })
  longitude: number;
  @ApiProperty({ required: true })
  likes: number;
  @ApiProperty({ required: true })
  status: number;
  @ApiProperty({ required: false })
  expiration_time: number;
}

export class SetFriends {
  @ApiProperty({ required: true })
  sender_id: number;
  @ApiProperty({ required: true })
  receiver_id: number;
  @ApiProperty({ required: true })
  status: number;
}
