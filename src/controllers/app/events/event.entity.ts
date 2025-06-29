import { ApiProperty } from '@nestjs/swagger';

class Picture {
  fileName: string | null | undefined;
  mimeType: string | null | undefined;
  base64: string | null | undefined;
}

export class SetEventDTO {
  @ApiProperty({ required: true })
  title: string;
  @ApiProperty({ required: true })
  user_id: number;
  @ApiProperty({ required: true })
  event_type_id: number;
  @ApiProperty({ required: true })
  main_pic: Picture;
  @ApiProperty({ required: true })
  content: string;
  @ApiProperty({ required: true })
  latitude: number;
  @ApiProperty({ required: true })
  longitude: number;
  @ApiProperty({ required: false })
  likes: number;
  @ApiProperty({ required: false })
  status: number;
  @ApiProperty({ required: false })
  expiration_time: Date;
  @ApiProperty({ required: false })
  users_joined: number;
  @ApiProperty({ required: false })
  starting_event: Date;
}
export class GetEventsDTO {
  @ApiProperty({ required: true })
  latitude: number;
  @ApiProperty({ required: true })
  longitude: number;
  @ApiProperty({ required: false })
  search: string;
}

export class GetEventDTO {
  @ApiProperty({ required: true })
  event_id: number;
}
export class GetEventsByUserDTO {
  @ApiProperty({ required: true })
  user_id: number;
}
export class GetEventsTypeDTO {
  @ApiProperty({ required: false })
  event_type_id?: number;
}
export class GetAllMyEventsDTO {
  @ApiProperty({ required: true })
  user_id?: number;
}
export class GetViewersDTO {
  @ApiProperty({ required: true })
  event_id: number;
  @ApiProperty({ required: false })
  user_id: number;
}
