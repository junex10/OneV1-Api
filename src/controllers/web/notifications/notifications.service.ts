import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
    NotificationType,
    Notifications,
    User
} from 'src/models';
import { Constants } from 'src/utils';
import {
    NotificationDTO
} from './notifications.entity';
import { Op } from 'sequelize';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(NotificationType) private notificationsTypeModel: typeof NotificationType,
        @InjectModel(Notifications) private notificationsModel: typeof Notifications,
        @InjectModel(User) private userModel: typeof User
    ) { }

    newTreatment = async (request: NotificationDTO) => {
        const personal = await this.userModel.findAll({
            where: {
                [Op.or]: [
                    {
                        level_id: Constants.LEVELS.ADMIN
                    },
                    {
                        level_id: Constants.LEVELS.USER
                    }
                ]
            }
        });
        const notificationType = await this.notificationsTypeModel.findOne({ where: { code: request.code } });
        const message = 'Se ha registrado un nuevo tratamiento';
        personal.map(async value => {

            await this.notificationsModel.create({
                title: notificationType.name,
                message,
                receiver_id: value.id,
                sender_id: request.user_id,
                status: Constants.NOTIFICATIONS.STATUS.UNREADED
            });
        });
        return true;
    }
}
