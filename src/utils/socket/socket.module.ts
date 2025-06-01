import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SequelizeModule } from "@nestjs/sequelize";

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
    ])
  ],
  exports: [
    SocketService
  ],
  providers: [
    SocketService
  ]
})
export class SocketModule {}
