import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SocketController } from './utils/socket/socket.controller';
import { SocketModule } from './utils/socket/socket.module';
const SequelizeConfig = require('./config');
import { MAIL_CONFIG } from './utils/mailer';
import * as path from 'path';
import { ScheduleModule } from '@nestjs/schedule';

import {
  AuthModule,
  NotificationsModule,
  ProfileModule,
  HomeModule,

  // App
  AppAuthModule,
  AppMapModule,
  AppEventsModule,
  AppProfileModule,
  ChatModule,
  AppFriendsModule,
  AppNotificationsModule,
} from 'src/controllers';

// Models
import {
  Level,
  User,
  Modules,
  Notifications,
  NotificationType,
  PasswordReset,
  Permissions,
  Person,
  Actions,
  CompanyInformation,
  Chats,
  ChatSession,
  ChatUsers,
  EventsType,
  Events,
  EventLikesUser,
  UsersCode,
  Friends,
  EventsUsersJoined,
  EventComments,
  EventPost,
  EventPostLikes,
} from './models';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      ...SequelizeConfig,
      models: [
        Level,
        User,
        Modules,
        Notifications,
        NotificationType,
        PasswordReset,
        Permissions,
        Person,
        Actions,
        CompanyInformation,
        Chats,
        ChatSession,
        ChatUsers,
        EventsType,
        Events,
        EventLikesUser,
        UsersCode,
        Friends,
        EventsUsersJoined,
        EventComments,
        EventPost,
        EventPostLikes,
      ],
    }),
    MailerModule.forRoot(MAIL_CONFIG),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    SocketModule,
    NotificationsModule,
    ProfileModule,
    HomeModule,

    //App

    AppAuthModule,
    AppMapModule,
    AppEventsModule,
    AppProfileModule,
    ChatModule,
    AppFriendsModule,
    AppNotificationsModule,

    ScheduleModule.forRoot(),
  ],
  providers: [SocketController],
  controllers: [],
})
export class AppModule {}
