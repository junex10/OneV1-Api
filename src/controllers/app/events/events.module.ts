import { Module } from '@nestjs/common';
import { AppEventsService } from './events.service';
import { AppEventsController } from './events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  User,
  Modules,
  PasswordReset,
  Person,
  Events,
  EventsType,
  EventLikesUser,
  EventsUsersJoined,
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
      EventsUsersJoined,
    ]),
    HttpModule,
  ],
  controllers: [AppEventsController],
  providers: [AppEventsService],
})
export class AppEventsModule {}
