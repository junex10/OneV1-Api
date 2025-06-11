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
  SocketCoordinates,
  SocketNewChatMessage,
  SocketNewPicChatMessage,
} from './socket.entity';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketController {
  @WebSocketServer() server: Server;

  constructor(private readonly socketService: SocketService) {}

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

  @SubscribeMessage('test')
  onEvent(client, data: any) {
    const event = 'test';
    console.log('TEST');
    return { test: ' JUST TESTING ', data };
  }
}
