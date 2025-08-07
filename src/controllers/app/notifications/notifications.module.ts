import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notifications, NotificationType, User, Events } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([Notifications, NotificationType, User, Events]),
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class AppNotificationsModule {}
