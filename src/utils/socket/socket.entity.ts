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
export class SocketNewEventComment {
  event_id: number;
  user_id: number;
  comment: string;
}
export class SocketNewEventLike {
  event_id: number;
  user_id: number;
}
export class SocketNewEventPost {
  event_id: number;
  user_id: number;
  content: string;
  latitude: number;
  longitude: number;
  attachment?: any;
}
export class SocketNewEventPostLike {
  event_id: number;
  user_id: number;
  real_event_id: number;
}
export class SocketOnUserSocket {
  user_id: number;
}
export class SocketOnNewReadNotificationSocket {
  user_id: number;
}
export class SocketOnNewMessageNotfSocket {
  sender_id: number;
  receiver_id: number;
  message: string;
}
export class SocketOnNewEventNotfSocket {
  sender_id: number;
}
