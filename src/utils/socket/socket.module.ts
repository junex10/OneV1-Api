import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Person, Chats } from 'src/models';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Person, Chats])],
  exports: [SocketService],
  providers: [SocketService],
})
export class SocketModule {}
