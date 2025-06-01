import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { SocketController } from 'src/utils/socket/socket.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([

        ])
    ],
    providers: [
        SocketController
    ],
})
export class ServicesModule {}
