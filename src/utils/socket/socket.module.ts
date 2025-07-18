import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  User,
  Person,
  Chats,
  ChatUsers,
  ChatSession,
  Events,
  EventsUsersJoined,
  EventComments,
  EventLikesUser,
  EventPost,
  EventPostLikes,
} from 'src/models';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Person,
      Chats,
      ChatUsers,
      ChatSession,
      Events,
      EventsUsersJoined,
      EventComments,
      EventLikesUser,
      EventPost,
      EventPostLikes,
    ]),
  ],
  exports: [SocketService],
  providers: [SocketService],
})
export class SocketModule {}
