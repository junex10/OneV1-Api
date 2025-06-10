import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MessageBody } from '@nestjs/websockets';
import SocketEvents from './socket.events';
import { Chats, Person, User } from 'src/models';
import { SocketCoordinates, SocketNewChatMessage } from './socket.entity';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Person) private personModel: typeof Person,
    @InjectModel(Chats) private chatsModel: typeof Chats,
  ) {}

  setUserLocation = async (coordinates: SocketCoordinates) => {
    await this.personModel.update(
      {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
      {
        where: {
          user_id: coordinates.user_id,
        },
      },
    );
  };
  newMessage = async (request: SocketNewChatMessage) => {
    await this.chatsModel.create({
      chat_session_id: request.chat_session_id,
      sender_id: request.sender_id,
      message: request.message,
    });
  };
}
