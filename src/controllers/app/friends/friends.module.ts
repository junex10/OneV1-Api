import { Module } from '@nestjs/common';
import { AppFriendsService } from './friends.service';
import { AppFriendsController } from './friends.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Person, Friends } from 'src/models';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SequelizeModule.forFeature([User, Person, Friends]), HttpModule],
  controllers: [AppFriendsController],
  providers: [AppFriendsService],
})
export class AppFriendsModule {}
