import { ApiProperty } from '@nestjs/swagger';

export class GetChatsDTO {
  @ApiProperty()
  user_id: number;
}
export class NewChatDTO {
  @ApiProperty()
  sender_id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiver_id?: number;
}
export class NewMessageDTO {
  @ApiProperty()
  sender_id: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  session_id: number;
  attachments?: [];
}
export class GetLogsDTO {
  @ApiProperty()
  chat_session_id: number;
}
export class DeleteDTO {
  @ApiProperty()
  chat_session_id: number;
  @ApiProperty()
  host_id: number;
}
export class ViewedDTO {
  @ApiProperty()
  chat_session_id: number;
  @ApiProperty()
  user_id: number;
}
