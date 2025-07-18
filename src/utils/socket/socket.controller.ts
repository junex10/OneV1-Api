import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import SocketEvents from './socket.events';
import { SocketService } from './socket.service';
import {
  SocketCheckNewEventIncoming,
  SocketCoordinates,
  SocketJoinEventDTO,
  SocketNewChatMessage,
  SocketNewEventComment,
  SocketNewEventLike,
  SocketNewEventPost,
  SocketNewEventPostLike,
  SocketNewPicChatMessage,
} from './socket.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway({ cors: { origin: '*' }, maxHttpBufferSize: 5e6 })
export class SocketController {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('test')
  onEvent(client, data: any) {
    const event = 'test';
    console.log('TEST');
    return { test: ' JUST TESTING ', data };
  }

  @SubscribeMessage(SocketEvents.USER_LOCATION)
  onUserLocation(client, data: SocketCoordinates) {
    this.socketService.setUserLocation(data);
    return { data };
  }

  // Chat
  @SubscribeMessage(SocketEvents.NEW_MESSAGE)
  async onNewMessage(client, data: SocketNewChatMessage) {
    const newData = await this.socketService.newMessage(data);
    this.server.emit(SocketEvents.NEW_MESSAGE, newData);
    return { data: newData };
  }

  @SubscribeMessage(SocketEvents.NEW_PIC_MESSAGE)
  async onNewPicMessage(client, data: SocketNewPicChatMessage) {
    const newData = await this.socketService.newPicMessage(data);
    this.server.emit(SocketEvents.NEW_PIC_MESSAGE, newData);
    return { data: newData };
  }

  // events

  @SubscribeMessage(SocketEvents.EVENTS.NEW_EVENT_INCOMING)
  async onNewEventIncoming(client, data: SocketCheckNewEventIncoming) {
    const newData = await this.socketService.onNewEventIncoming(data);
    this.server.emit(SocketEvents.EVENTS.NEW_EVENT_INCOMING, {
      places: newData,
    });
    return { places: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.USER_JOINING)
  async onUserJoiningEvent(client, data: SocketJoinEventDTO) {
    client.join(`event_${data.event_id}`);
    const newData = await this.socketService.onUserJoiningEvent(data);
    this.server
      .to(`event_${data.event_id}`)
      .emit(SocketEvents.EVENTS.USER_JOINING, { data: newData });
    return { data: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.USER_LEFT)
  async onUserLeftEvent(client, data: SocketJoinEventDTO) {
    const newData = await this.socketService.onUserLeftEvent(data);
    this.server
      .to(`event_${data.event_id}`)
      .emit(SocketEvents.EVENTS.USER_LEFT, { data: newData });
    client.leave(`event_${data.event_id}`);
    return { data: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.NEW_COMMENT)
  async onNewEventComment(client, data: SocketNewEventComment) {
    const newData = await this.socketService.onNewEventComment(data);
    this.server
      .to(`event_${data.event_id}`)
      .emit(SocketEvents.EVENTS.NEW_COMMENT, { comment: newData });
    return { comment: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.NEW_LIKE)
  async onNewEventLike(client, data: SocketNewEventLike) {
    const newData = await this.socketService.onNewEventLike(data);
    this.server
      .to(`event_${data.event_id}`)
      .emit(SocketEvents.EVENTS.NEW_LIKE, { comment: newData });
    return { comment: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.NEW_POST)
  async onNewEventPost(client, data: SocketNewEventPost) {
    const newData = await this.socketService.onNewEventPost(data);
    this.server
      .to(`event_${data.event_id}`)
      .emit(SocketEvents.EVENTS.NEW_POST, { post: newData });
    return { post: newData };
  }

  @SubscribeMessage(SocketEvents.EVENTS.NEW_POST_LIKE)
  async onNewEventPostLike(client, data: SocketNewEventPostLike) {
    const newData = await this.socketService.onNewEventPostLike(data);
    this.server
      .to(`event_${data.real_event_id}`)
      .emit(SocketEvents.EVENTS.NEW_POST_LIKE, { post: newData });
    return { post: newData };
  }

  // CRONS - Events

  /* @Cron(CronExpression.EVERY_MINUTE) // We're gonna check events that are ready to start, this is for events that we are host and also check other ones that are expired
  async checkActiveEvents() {
    await this.socketService.checkActiveEvents();
  }*/
}
