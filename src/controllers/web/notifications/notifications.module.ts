import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import {
  Notifications,
  NotificationType,
  User
} from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Notifications,
      NotificationType,
      User
    ])
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
