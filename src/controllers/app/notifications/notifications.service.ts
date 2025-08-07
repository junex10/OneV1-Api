import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Events, NotificationType, Notifications, User } from 'src/models';
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
    private eventsModel: typeof Events,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  getNotifications = async (request: NotificationDTO) => {
    if (!request.user_id) {
      return null;
    }

    // Get all notifications for the user
    const allNotifications = await this.notificationsModel.findAll({
      where: { receiver_id: request.user_id },
    });

    // Separate invitations and other notifications
    const invitations = allNotifications.filter(
      (notif) =>
        notif.notification_type_id ===
        Constants.NOTIFICATIONS.TYPES.NEW_INVITATION,
    );
    const others = allNotifications.filter(
      (notif) =>
        notif.notification_type_id !==
        Constants.NOTIFICATIONS.TYPES.NEW_INVITATION,
    );

    // Sort invitations and others by created_at DESC
    invitations.sort((a: any, b: any) => b.created_at - a.created_at);
    others.sort((a: any, b: any) => b.created_at - a.created_at);

    // Return invitations first, then others
    return [...invitations, ...others];
  };

  getCountNotifications = async (request: NotificationDTO) => {
    if (!request.user_id) {
      return null;
    }
    return await this.notificationsModel.findAndCountAll({
      where: {
        receiver_id: request.user_id,
        status: Constants.NOTIFICATIONS.STATUS.UNREADED,
      },
    });
  };

  readNotifications = async (request: NotificationDTO) => {
    if (!request.user_id) {
      return null;
    }

    await this.notificationsModel.update(
      {
        status: Constants.NOTIFICATIONS.STATUS.READED,
      },
      {
        where: {
          receiver_id: request.user_id,
          status: Constants.NOTIFICATIONS.STATUS.UNREADED,
        },
      },
    );
    return await this.notificationsModel.findAll({
      where: {
        receiver_id: request.user_id,
        status: Constants.NOTIFICATIONS.STATUS.UNREADED,
      },
    });
  };
}
