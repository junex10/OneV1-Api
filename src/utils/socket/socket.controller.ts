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
import { SocketCoordinates } from './socket.entity';

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

  @SubscribeMessage('test')
  onEvent(client, data: any) {
    const event = 'test';
    console.log('TEST');
    return { test: ' JUST TESTING ', data };
  }
}
