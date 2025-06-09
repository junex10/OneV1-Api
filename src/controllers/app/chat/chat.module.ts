import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { 
  User,
  Chats,
  ChatSession,
  ChatUsers,
} from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Chats,
      ChatSession,
      ChatUsers,
    ])
  ],
  controllers: [
    ChatController
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule {}
