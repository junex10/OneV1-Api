import { Module } from '@nestjs/common';
import { AppTestMapService } from './test_map.service';
import { AppTestMapController } from './test_map.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  User,
  Modules,
  PasswordReset,
  Person,
  Events,
  EventsType,
  EventLikesUser,
  Friends,
} from 'src/models';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules,
      PasswordReset,
      Person,
      Events,
      EventsType,
      EventLikesUser,
      Friends,
    ]),
    HttpModule,
  ],
  controllers: [AppTestMapController],
  providers: [AppTestMapService],
})
export class AppTestMapModule {}
