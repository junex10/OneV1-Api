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
} from 'src/models';
import { ServicesModule } from '../../services/services.module';

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
    ]),
    ServicesModule,
  ],
  exports: [SocketService],
  providers: [SocketService],
})
export class SocketModule {}
