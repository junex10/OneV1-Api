import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Person, Chats, ChatUsers, ChatSession } from 'src/models';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User, Person, Chats, ChatUsers, ChatSession]),
  ],
  exports: [SocketService],
  providers: [SocketService],
})
export class SocketModule {}
