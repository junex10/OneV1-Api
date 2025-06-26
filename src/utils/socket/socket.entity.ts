class AttachmentPic {
  uri: string;
  type: string;
}
export class SocketCoordinates {
  latitude: string;
  longitude: string;
  user_id: number;
}
export class SocketNewChatMessage {
  chat_session_id: number;
  sender_id: number;
  message: string;
  other_user_id: number;
}
export class SocketNewPicChatMessage {
  chat_session_id: number;
  sender_id: number;
  attachment: any;
  other_user_id: number;
}
export class GetLogs {
  user_id: number;
  other_user_id: number;
}
export class SocketCheckNewEventIncoming {
  user_id: number;
}
export class SocketJoinEventDTO {
  user_id: number;
  event_id: number;
}
