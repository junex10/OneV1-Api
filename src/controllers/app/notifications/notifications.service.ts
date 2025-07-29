import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationType, Notifications, User } from 'src/models';
import { Constants } from 'src/utils';
import { NotificationDTO } from './notifications.entity';
import { Op } from 'sequelize';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationType)
    private notificationsTypeModel: typeof NotificationType,
    @InjectModel(Notifications)
    private notificationsModel: typeof Notifications,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  getNotifications = async (request: NotificationDTO) => {
    if (!request.user_id) {
      return null;
    }
    return await this.notificationsModel.findAll({
      where: { receiver_id: request.user_id },
      order: [['created_at', 'DESC']],
    });
  };
}
