// Web

import { AuthModule } from './web/auth/auth.module';
import { NotificationsModule } from './web/notifications/notifications.module';
import { ProfileModule } from './web/profile/profile.module';
import { HomeModule } from './web/home/home.module';

// App

import { AppAuthModule } from './app/auth/auth.module';
import { AppMapModule } from './app/map/map.module';
import { AppTestMapModule } from './app/test/test_map.module';
import { AppEventsModule } from './app/events/events.module';
import { AppProfileModule } from './app/profile/profile.module';
import { ChatModule } from './app/chat/chat.module';

export {
  AuthModule,
  NotificationsModule,
  ProfileModule,
  HomeModule,

  // App
  AppAuthModule,
  AppMapModule,
  AppTestMapModule,
  AppEventsModule,
  AppProfileModule,
  ChatModule,
};
